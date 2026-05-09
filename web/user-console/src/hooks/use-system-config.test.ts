import { describe, expect, it } from "vitest";
import { DEFAULT_LOGO, DEFAULT_SYSTEM_NAME } from "@/lib/constants";
import { mapStatusDataToConfig } from "./use-system-config";

describe("mapStatusDataToConfig", () => {
  it("uses RightMaaS defaults for placeholder branding", () => {
    const config = mapStatusDataToConfig({
      system_name: "New API",
      logo: "/righttoken-logo.svg",
      footer_html: "<p>footer</p>",
      server_address: "https://gateway.example.com///",
      demo_site_enabled: true,
    });

    expect(config.systemName).toBe(DEFAULT_SYSTEM_NAME);
    expect(config.logo).toBe(DEFAULT_LOGO);
    expect(config.footerHtml).toBe("<p>footer</p>");
    expect(config.serverAddress).toBe("https://gateway.example.com");
    expect(config.demoSiteEnabled).toBe(true);
  });

  it("keeps configured system branding and normalizes bundled logo assets", () => {
    const config = mapStatusDataToConfig({
      system_name: "Custom Console",
      logo: "/righttoken-icon-512.png",
    });

    expect(config.systemName).toBe("Custom Console");
    expect(config.logo).toBe("/icon-512x512.png");
  });
});
