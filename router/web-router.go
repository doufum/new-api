package router

import (
	"embed"
	"bytes"
	"net/http"
	"path"
	"regexp"
	"strings"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/controller"
	"github.com/QuantumNous/new-api/middleware"
	"github.com/gin-contrib/gzip"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

var (
	titleTagPattern     = regexp.MustCompile(`(?i)<title>.*?</title>`)
	metaTitleTagPattern = regexp.MustCompile(`(?i)<meta\s+name=["']title["']\s+content=["'][^"']*["']\s*/?>`)
)

// ThemeAssets holds the embedded frontend assets for both themes.
type ThemeAssets struct {
	DefaultBuildFS       embed.FS
	DefaultIndexPage     []byte
	ClassicBuildFS       embed.FS
	ClassicIndexPage     []byte
	UserConsoleBuildFS   embed.FS
	UserConsoleIndexPage []byte
}

func SetWebRouter(router *gin.Engine, assets ThemeAssets) {
	defaultFS := common.EmbedFolder(assets.DefaultBuildFS, "web/default/dist")
	classicFS := common.EmbedFolder(assets.ClassicBuildFS, "web/classic/dist")
	themeFS := common.NewThemeAwareFS(defaultFS, classicFS)

	userConsoleFS := common.EmbedFolder(assets.UserConsoleBuildFS, "web/user-console/dist")

	router.Use(gzip.Gzip(gzip.DefaultCompression))
	router.Use(middleware.GlobalWebRateLimit())
	router.Use(middleware.Cache())

	router.Use(func(c *gin.Context) {
		requestPath := c.Request.URL.Path

		if requestPath == "/user-console" || strings.HasPrefix(requestPath, "/user-console/") {
			redirectPath := strings.TrimPrefix(requestPath, "/user-console")
			if redirectPath == "" {
				redirectPath = "/"
			}
			c.Redirect(http.StatusMovedPermanently, redirectPath)
			c.Abort()
			return
		}

		if strings.HasPrefix(requestPath, common.ManagementMountPath) {
			managementPath := strings.TrimPrefix(requestPath, common.ManagementMountPath)
			if managementPath == "" || managementPath == "/" {
				managementPath = "/"
			}
			serveEmbeddedSPA(c, themeFS, strings.TrimPrefix(managementPath, "/"), managementIndexPage(assets))
			return
		}

		if shouldServeUserConsole(requestPath) {
			serveEmbeddedSPA(c, userConsoleFS, strings.TrimPrefix(requestPath, "/"), assets.UserConsoleIndexPage)
			return
		}

		c.Next()
	})

	router.NoRoute(func(c *gin.Context) {
		c.Set(middleware.RouteTagKey, "web")
		requestURI := c.Request.RequestURI
		if strings.HasPrefix(requestURI, "/v1") || strings.HasPrefix(requestURI, "/api") || strings.HasPrefix(requestURI, "/assets") {
			controller.RelayNotFound(c)
			return
		}
		serveEmbeddedSPA(c, userConsoleFS, strings.TrimPrefix(c.Request.URL.Path, "/"), assets.UserConsoleIndexPage)
	})
}

func managementIndexPage(assets ThemeAssets) []byte {
	if common.GetTheme() == "classic" {
		return assets.ClassicIndexPage
	}
	return assets.DefaultIndexPage
}

func shouldServeUserConsole(requestPath string) bool {
	if requestPath == "" || requestPath == "/" {
		return true
	}
	if strings.HasPrefix(requestPath, common.ManagementMountPath) {
		return false
	}
	if strings.HasPrefix(requestPath, "/api") || strings.HasPrefix(requestPath, "/v1") || strings.HasPrefix(requestPath, "/mj") || strings.HasPrefix(requestPath, "/pg") || strings.HasPrefix(requestPath, "/videos") {
		return false
	}
	if strings.HasPrefix(requestPath, "/oauth/telegram/") {
		return false
	}
	return true
}

func serveEmbeddedSPA(
	c *gin.Context,
	fileSystem static.ServeFileSystem,
	relativePath string,
	indexPage []byte,
) {
	c.Header("Cache-Control", "no-cache")

	cleanPath := strings.TrimPrefix(path.Clean("/"+relativePath), "/")
	if cleanPath != "" && cleanPath != "." {
		file, err := fileSystem.Open(cleanPath)
		if err == nil {
			defer file.Close()
			stat, err := file.Stat()
			if err == nil && !stat.IsDir() {
				http.ServeContent(c.Writer, c.Request, stat.Name(), stat.ModTime(), file.(http.File))
				c.Abort()
				return
			}
		}
	}

	c.Data(http.StatusOK, "text/html; charset=utf-8", renderIndexPageWithBranding(indexPage))
	c.Abort()
}

func renderIndexPageWithBranding(indexPage []byte) []byte {
	systemName := common.NormalizeSystemName(common.SystemName)
	if systemName == common.BuiltInSystemName {
		return indexPage
	}

	branded := titleTagPattern.ReplaceAll(indexPage, []byte("<title>"+systemName+"</title>"))
	if metaTitleTagPattern.Match(branded) {
		branded = metaTitleTagPattern.ReplaceAll(
			branded,
			[]byte(`<meta name="title" content="`+systemName+`" />`),
		)
	}

	if bytes.Equal(branded, indexPage) {
		return indexPage
	}
	return branded
}
