package model

import (
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/QuantumNous/new-api/constant"
	"github.com/stretchr/testify/require"
)

func TestChannelInfoValueReturnsJSONString(t *testing.T) {
	channelInfo := ChannelInfo{
		IsMultiKey:           true,
		MultiKeySize:         2,
		MultiKeyStatusList:   map[int]int{0: 1},
		MultiKeyPollingIndex: 1,
		MultiKeyMode:         constant.MultiKeyModePolling,
	}

	value, err := channelInfo.Value()
	require.NoError(t, err)

	jsonStr, ok := value.(string)
	require.True(t, ok, "channel_info should be encoded as JSON string for database drivers")

	var decoded ChannelInfo
	require.NoError(t, common.UnmarshalJsonStr(jsonStr, &decoded))
	require.Equal(t, channelInfo, decoded)
}

func TestPropertiesValueReturnsJSONString(t *testing.T) {
	properties := Properties{
		Input:             "hello",
		UpstreamModelName: "gpt-5.4-mini",
		OriginModelName:   "gpt-5.4-mini",
	}

	value, err := properties.Value()
	require.NoError(t, err)

	jsonStr, ok := value.(string)
	require.True(t, ok, "properties should be encoded as JSON string for database drivers")

	var decoded Properties
	require.NoError(t, common.UnmarshalJsonStr(jsonStr, &decoded))
	require.Equal(t, properties, decoded)
}

func TestTaskPrivateDataValueReturnsJSONString(t *testing.T) {
	privateData := TaskPrivateData{
		Key:            "secret",
		UpstreamTaskID: "task_123",
		ResultURL:      "https://example.com/result",
	}

	value, err := privateData.Value()
	require.NoError(t, err)

	jsonStr, ok := value.(string)
	require.True(t, ok, "private_data should be encoded as JSON string for database drivers")

	var decoded TaskPrivateData
	require.NoError(t, common.UnmarshalJsonStr(jsonStr, &decoded))
	require.Equal(t, privateData, decoded)
}

func TestJSONValueReturnsJSONString(t *testing.T) {
	jsonValue := JSONValue(`{"items":["a","b"]}`)

	value, err := jsonValue.Value()
	require.NoError(t, err)

	jsonStr, ok := value.(string)
	require.True(t, ok, "json values should be encoded as JSON string for database drivers")
	require.Equal(t, string(jsonValue), jsonStr)
}
