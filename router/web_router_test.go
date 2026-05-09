package router

import (
	"embed"
	"io/fs"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/gin-gonic/gin"
)

//go:embed web/default/dist web/default/dist/index.html web/classic/dist web/classic/dist/index.html web/user-console/dist web/user-console/dist/index.html
var testAssetsFS embed.FS

func mustReadTestAsset(t *testing.T, path string) []byte {
	t.Helper()

	data, err := fs.ReadFile(testAssetsFS, path)
	if err != nil {
		t.Fatalf("read asset %s: %v", path, err)
	}
	return data
}

func buildTestAssets(t *testing.T) ThemeAssets {
	t.Helper()

	return ThemeAssets{
		DefaultBuildFS:       testAssetsFS,
		DefaultIndexPage:     mustReadTestAsset(t, "web/default/dist/index.html"),
		ClassicBuildFS:       testAssetsFS,
		ClassicIndexPage:     mustReadTestAsset(t, "web/classic/dist/index.html"),
		UserConsoleBuildFS:   testAssetsFS,
		UserConsoleIndexPage: mustReadTestAsset(t, "web/user-console/dist/index.html"),
	}
}

func TestSetWebRouterRoutesUserConsoleAtRootAndManagementSeparately(t *testing.T) {
	gin.SetMode(gin.TestMode)
	common.SetTheme("default")

	engine := gin.New()
	SetWebRouter(engine, buildTestAssets(t))

	tests := []struct {
		name         string
		path         string
		wantCode     int
		wantBodyLike string
		wantLocation string
	}{
		{
			name:         "root serves user console",
			path:         "/",
			wantCode:     http.StatusOK,
			wantBodyLike: "user-console",
		},
		{
			name:         "user console public route falls back to spa index",
			path:         "/pricing",
			wantCode:     http.StatusOK,
			wantBodyLike: "user-console",
		},
		{
			name:         "user console console route remains available",
			path:         "/console",
			wantCode:     http.StatusOK,
			wantBodyLike: "user-console",
		},
		{
			name:         "management root serves management frontend",
			path:         "/management",
			wantCode:     http.StatusOK,
			wantBodyLike: "default-management",
		},
		{
			name:         "management subroute falls back to management spa index",
			path:         "/management/console",
			wantCode:     http.StatusOK,
			wantBodyLike: "default-management",
		},
		{
			name:         "root static assets resolve from user console namespace",
			path:         "/static/app.js",
			wantCode:     http.StatusOK,
			wantBodyLike: "user-console-static",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req := httptest.NewRequest(http.MethodGet, tt.path, nil)
			rec := httptest.NewRecorder()

			engine.ServeHTTP(rec, req)

			if rec.Code != tt.wantCode {
				t.Fatalf("status = %d, want %d", rec.Code, tt.wantCode)
			}

			if tt.wantLocation != "" {
				if got := rec.Header().Get("Location"); got != tt.wantLocation {
					t.Fatalf("location = %q, want %q", got, tt.wantLocation)
				}
			}

			if tt.wantBodyLike != "" && !strings.Contains(rec.Body.String(), tt.wantBodyLike) {
				t.Fatalf("body = %q, want substring %q", rec.Body.String(), tt.wantBodyLike)
			}
		})
	}
}
