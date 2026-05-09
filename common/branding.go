package common

import "strings"

const (
	BuiltInSystemName = "RightMaaS"
	LegacySystemName  = "New API"
	LegacyBrandName   = "RightToken"
)

func NormalizeSystemName(value string) string {
	trimmed := strings.TrimSpace(value)
	if trimmed == "" || trimmed == LegacySystemName || trimmed == LegacyBrandName {
		return BuiltInSystemName
	}
	return trimmed
}
