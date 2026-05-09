import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { DEFAULT_LOGO, DEFAULT_SYSTEM_NAME } from "@/lib/constants";
import { USER_CONSOLE_MOUNT_PATH, getUserConsoleMountConfig } from "./app-base";

describe("getUserConsoleMountConfig", () => {
  it("uses the root mount path in production", () => {
    expect(getUserConsoleMountConfig(true)).toEqual({
      assetPrefix: USER_CONSOLE_MOUNT_PATH,
      routerBasePath: USER_CONSOLE_MOUNT_PATH,
    });
  });

  it("keeps the root path in development", () => {
    expect(getUserConsoleMountConfig(false)).toEqual({
      assetPrefix: "/",
      routerBasePath: "/",
    });
  });

  it("uses RightMaaS as the default brand fallback", () => {
    expect(DEFAULT_SYSTEM_NAME).toBe("RightMaaS");
    expect(DEFAULT_LOGO).toBe("/icon-512x512.png");
  });

  it("references the shared favicon assets in index.html", () => {
    const html = readFileSync(resolve(process.cwd(), "index.html"), "utf8");
    expect(html).toContain("/favicon.ico");
    expect(html).toContain("/icon-16x16.png");
    expect(html).toContain("/icon-32x32.png");
    expect(html).toContain("/icon-48x48.png");
    expect(html).toContain("/icon-128x128.png");
    expect(html).toContain("/icon-256x256.png");
    expect(html).toContain("/icon-512x512.png");
  });
});
