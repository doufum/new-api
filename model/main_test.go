package model

import (
	"testing"

	"github.com/stretchr/testify/require"
)

func TestPostgresGormConfigDisablesPreparedStmt(t *testing.T) {
	cfg := postgresGormConfig()
	require.NotNil(t, cfg)
	require.False(t, cfg.PrepareStmt)
}
