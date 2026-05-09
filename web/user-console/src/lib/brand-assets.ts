const DEFAULT_USER_CONSOLE_LOGO = "/icon-512x512.png";

const BUILTIN_BRAND_LOGO_PATHS = new Set([
  "/rightmaas-logo.svg",
  "/rightmaas-icon.svg",
  "/rightmaas-icon-32.png",
  "/rightmaas-icon-64.png",
  "/rightmaas-icon-128.png",
  "/rightmaas-icon-256.png",
  "/rightmaas-icon-512.png",
  "/righttoken-logo.svg",
  "/righttoken-icon.svg",
  "/righttoken-icon-32.png",
  "/righttoken-icon-64.png",
  "/righttoken-icon-128.png",
  "/righttoken-icon-256.png",
  "/righttoken-icon-512.png",
  "/logo.png",
]);

const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+.-]*:/i;

export function getDefaultUserConsoleLogo() {
  return DEFAULT_USER_CONSOLE_LOGO;
}

export function normalizeUserConsoleLogo(
  value: string | null | undefined,
): string {
  if (typeof value !== "string") return "";

  const trimmed = value.trim();
  if (!trimmed) return "";

  if (trimmed.startsWith("//") || ABSOLUTE_URL_PATTERN.test(trimmed)) {
    return trimmed;
  }
  if (BUILTIN_BRAND_LOGO_PATHS.has(trimmed)) {
    return DEFAULT_USER_CONSOLE_LOGO;
  }

  return trimmed;
}
