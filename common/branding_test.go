package common

import "testing"

func TestNormalizeSystemName(t *testing.T) {
	tests := []struct {
		name  string
		input string
		want  string
	}{
		{name: "empty falls back to current default", input: "", want: "RightMaaS"},
		{name: "legacy new api falls back to current default", input: "New API", want: "RightMaaS"},
		{name: "legacy righttoken falls back to current default", input: "RightToken", want: "RightMaaS"},
		{name: "custom value preserved", input: "Acme Gateway", want: "Acme Gateway"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NormalizeSystemName(tt.input); got != tt.want {
				t.Fatalf("NormalizeSystemName(%q) = %q, want %q", tt.input, got, tt.want)
			}
		})
	}
}
