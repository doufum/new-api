package router

import (
	"strings"
	"testing"

	"github.com/QuantumNous/new-api/common"
)

func TestRenderIndexPageBrandingOverridesStaticBuiltInTitle(t *testing.T) {
	common.SystemName = "Acme Gateway"

	html := []byte(`<!doctype html><html><head><title>RightMaaS</title><meta name="title" content="RightMaaS" /></head><body></body></html>`)
	branded := renderIndexPageWithBranding(html)

	if !strings.Contains(string(branded), "<title>Acme Gateway</title>") {
		t.Fatalf("expected branded title, got %q", string(branded))
	}
	if !strings.Contains(string(branded), `content="Acme Gateway"`) {
		t.Fatalf("expected branded meta title, got %q", string(branded))
	}
	if strings.Contains(string(branded), "RightMaaS") {
		t.Fatalf("expected static built-in title to be replaced, got %q", string(branded))
	}
}
