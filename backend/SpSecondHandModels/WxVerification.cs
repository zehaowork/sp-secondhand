using Newtonsoft.Json;

namespace SpSecondHandModels
{
    public class WxVerification
    {
        [JsonProperty("openid")]
        public string OpenId { get; set; }

        [JsonProperty("session_key")]
        public string SessionKey { get; set; }
    }
}
