using System;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpSecondHandApi.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class WeChatService : IWeChatService
    {
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IMemoryCache _cache;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private string _wxImgSecCheckUrl = @"https://api.weixin.qq.com/wxa/img_sec_check?access_token=";
        private string _wxAccessTokenUrl = @"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";
        private string _wxServerUrl = @"https://api.weixin.qq.com/sns/jscode2session?";

        public WeChatService(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache, IConfiguration config)
        {
            _httpClientFactory = httpClientFactory;
            _cache = memoryCache;
            _config = config;
            _httpClient = httpClientFactory.CreateClient();
        }
        public async Task<bool> ImgSecCheck(byte[] btData)
        {
            var token = await GetToken();

            var array = new ByteArrayContent(btData);
            array.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            var url = _wxImgSecCheckUrl + token;
            var res = await _httpClient.PostAsync(url, array);

            var data = await res.Content.ReadAsStringAsync();
            var result = JObject.Parse(data);
            var code = result.Root.SelectToken("errcode").ToString();

            if (code == "87014")
                return false;

            return true;
        }

        public async Task<string> GetWxOpenId(string code)
        {
            _wxServerUrl += "appid=" + _config["WxVerification:appid"];
            _wxServerUrl += "&secret=" + _config["WxVerification:secret"];
            _wxServerUrl += "&js_code=" + code;
            _wxServerUrl += "&grant_type" + _config["WxVerification:grant_type"];

            var request = new HttpRequestMessage(HttpMethod.Get, _wxServerUrl);
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            WxVerification wxVerification;
            var stream = await response.Content.ReadAsStreamAsync();
            using (var streamReader = new StreamReader(stream))
            {
                using (var jsonTextReader = new JsonTextReader(streamReader))
                {
                    var jsonSerializer = new JsonSerializer();
                    wxVerification = jsonSerializer.Deserialize<WxVerification>(jsonTextReader);
                }
            }

            if (wxVerification.OpenId == null)
                throw new ArgumentException("Null OpenId returned from WeChat server, please check code validity.");

            return wxVerification.OpenId;
        }

        #region Private

        private async Task<string> GetToken()
        {
            if (_cache.TryGetValue("WxToken", out string token))
            {
                return token;
            }

            return await RequestAccessToken();
        }

        private async Task<string> RequestAccessToken()
        {
            _wxAccessTokenUrl += "&appid=" + _config["WxVerification:appid"];
            _wxAccessTokenUrl += "&secret=" + _config["WxVerification:secret"];

            //request.ContentType = "text/html;charset=UTF-8";

            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync(_wxAccessTokenUrl);

            response.EnsureSuccessStatusCode();

            await using var stream = await response.Content.ReadAsStreamAsync();
            using var streamReader = new StreamReader(stream, Encoding.UTF8);
            var serializedJson = await streamReader.ReadToEndAsync();

            var data = JsonConvert.DeserializeObject<WxAccessToken>(serializedJson);
            if (data != null)
            {
                _cache.Set("WxToken", data.AccessToken, TimeSpan.FromMinutes(10));

                return data.AccessToken;
            }

            return string.Empty;
        }

        #endregion
    }
}
