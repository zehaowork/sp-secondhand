using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class SecondHandService : ISecondHandService
    {
        public SecondHandService(IHttpClientFactory httpClientFactory, IMemoryCache memoryCache, IConfiguration config, ISecondHandRepository shRepo)
        {
            _memoryCache = memoryCache;
            _config = config;
            _shRepo = shRepo;
            _httpClient = httpClientFactory.CreateClient();
        }

        public async Task<SecondHandDto> GetSecondHandById(int id)
        {
            var shItem = await _shRepo.Get(id);

            if (shItem == null)
            {
                throw new ArgumentException($"Second hand item {id} doesn't exist.");
            }

            shItem.Popularity++;
            await _shRepo.Update(shItem);

            return new SecondHandDto(shItem);
        }

        public async Task<List<SecondHandDto>> GetSecondHandByPage(int page, int size)
        {
            var shList = await _shRepo.GetSecondHandByPage(page, size);

            return shList.Select(sh => new SecondHandDto(sh)).ToList();
        }

        public async Task<List<SecondHandDto>> GetSecondHandByUser(int userId, int page, int size)
        {
            var shList = await _shRepo.FindAll(sh => sh.UserId == userId , page, size);

            return shList.Select(sh => new SecondHandDto(sh)).ToList();
        }

        public async Task<List<SecondHandDto>> GetSecondHandByCity(int cityId, int page, int size)
        {
            var shList = await _shRepo.FindAll(sh => sh.RegionId == cityId, page, size);

            return shList.Select(sh => new SecondHandDto(sh)).ToList();
        }

        public async Task<List<SecondHandDto>> SearchSecondHand(string keyword, int page, int size)
        {
            var shList = await _shRepo.FindAll(sh => sh.Title.Contains(keyword), page, size);

            return shList.Select(sh => new SecondHandDto(sh)).ToList();
        }

        public async Task<SecondHandDto> PublishSecondHand(SecondHandDto shDto)
        {
            var newSh = new SecondHand()
            {
                Id = shDto.Id,
                Title = shDto.Title,
                ImgUrl = shDto.ImgUrl,
                ImgsUrl = shDto.ImgsUrl,
                Description = shDto.Description,
                WeChatId = shDto.WeChatId,
                Telephone = shDto.Telephone,
                Price = shDto.Price,
                GoodType = shDto.GoodType,
                Address = shDto.Address,
                UserId = shDto.UserId,
                ItemsId = shDto.ItemsId,
                ProjectId = shDto.ProjectId,
                CreateTime = shDto.CreateTime,
                RegionId = shDto.RegionId,
                IsSale = false,
                Popularity = 0,
            };

            return new SecondHandDto(await _shRepo.Add(newSh));
        }

        public async Task<SecondHandDto> ModifySecondHand(SecondHandDto shDto)
        {
            var sh = await _shRepo.Get(shDto.Id);
            if (sh == null)
            {
                throw new ArgumentException($"Second hand item of id {shDto.Id} doesn't exist.");
            }

            sh.Title = shDto.Title;
            sh.ImgUrl = shDto.ImgUrl;
            sh.ImgsUrl = shDto.ImgsUrl;
            sh.Description = shDto.Description;
            sh.WeChatId = shDto.WeChatId;
            sh.Telephone = shDto.Telephone;
            sh.Price = shDto.Price;
            sh.GoodType = shDto.GoodType;
            sh.Address = shDto.Address;
            sh.ItemsId = shDto.ItemsId;
            sh.ProjectId = shDto.ProjectId;
            sh.RegionId = shDto.RegionId;
            sh.IsSale = shDto.IsSale;

            return new SecondHandDto(await _shRepo.Update(sh));
        }

        public async Task DeleteSecondHand(int shId)
        {
            var sh = await _shRepo.Get(shId);
            if (sh == null)
            {
                throw new ArgumentException($"Second hand item of id {shId} doesn't exist.");
            }

            await _shRepo.Delete(sh);
        }

        public async Task<List<string>> UploadImg(List<IFormFile> images)
        {
            const string fileTypes = "gif,jpg,jpeg,png,bmp";
            var folderToSave = $"UploadedImg";
            var imgUrls = new List<string>();

            foreach (var img in images)
            {
                var extension = Path.GetExtension(img.FileName);

                //upload fail（判断是否是运行上传的图片格式）
                if (Array.IndexOf(fileTypes.Split(','), extension?.Substring(1).ToLower()) == -1)
                {
                    throw new ArgumentException("Invalid image format.");
                }

                var newFileName = $"img_{Guid.NewGuid()}{extension}"; //重命名
                var path = Path.Combine(folderToSave, newFileName);

                // Create folder if doesn't exist.
                Directory.CreateDirectory(Path.GetDirectoryName(path));

                await using var stream = new FileStream(path, FileMode.Create);
                using var binReader = new BinaryReader(img.OpenReadStream());
                var btData = binReader.ReadBytes((int)img.Length);
                if (await ImgSecCheck(btData))
                {
                    await img.CopyToAsync(stream);
                    imgUrls.Add(path);
                }
                else
                {
                    throw new ArgumentException("图片中含有内含有敏感信息,禁止上传");
                }
            }

            return imgUrls.Select(url => url.Replace("\\", "/")).ToList();
        }

        #region Private

        private async Task<bool> ImgSecCheck(byte[] btData)
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

        private async Task<string> GetToken()
        {
            if (_memoryCache.TryGetValue("WxToken", out string token))
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
            var response = await _httpClient.GetAsync(_wxAccessTokenUrl);

            response.EnsureSuccessStatusCode();

            await using var stream = await response.Content.ReadAsStreamAsync();
            using var streamReader = new StreamReader(stream, Encoding.UTF8);
            var serializedJson = await streamReader.ReadToEndAsync();

            var data = JsonConvert.DeserializeObject<WxAccessToken>(serializedJson);
            if (data != null)
            {
                _memoryCache.Set("WxToken", data.AccessToken, TimeSpan.FromMinutes(10));

                return data.AccessToken;
            }

            return string.Empty;
        }

        private readonly IMemoryCache _memoryCache;
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly ISecondHandRepository _shRepo;
        private string _wxImgSecCheckUrl = @"https://api.weixin.qq.com/wxa/img_sec_check?access_token=";
        private string _wxAccessTokenUrl = @"https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential";

        #endregion
    }
}
