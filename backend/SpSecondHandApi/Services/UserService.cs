using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class UserService : IUserService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private string _wxServerUrl = @"https://api.weixin.qq.com/sns/jscode2session?";

        public UserService(IHttpClientFactory httpClientFactory, IConfiguration config, IUserRepository userRepository, IMapper mapper)
        {
            _httpClient = httpClientFactory.CreateClient();
            _config = config;
            _userRepo = userRepository;
            _mapper = mapper;
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

        public async Task<UserDto> TryCreateUserRecord(UserDto user)
        {
            var userFromDb = await _userRepo.FindFirst(u => u.OpenId == user.OpenId);

            // If user already exists in database then update and return it directly
            if (userFromDb != null)
            {
                userFromDb.UserName = user.UserName;
                userFromDb.ProfileImgUrl = user.ProfileImgUrl;
                userFromDb.Gender = user.Gender;

                return _mapper.Map<UserDto>(await _userRepo.Update(userFromDb));
            }

            user.JoinTime = DateTime.UtcNow;
            var userToAdd = _mapper.Map<User>(user);
            var userAdded = await _userRepo.Add(userToAdd);

            return _mapper.Map<UserDto>(userAdded);
        }

        public async Task<List<UserDto>> GetAllUsers()
        {
            var userList = await _userRepo.GetAll();

            return userList.Select(u => _mapper.Map<UserDto>(u)).ToList();
        }

        public async Task<UserDto> GetByUserId(long id)
        {
            var userEntity = await _userRepo.Get(id);

            if (userEntity == null)
                throw new ArgumentException($"User with id {id} doesn't exist.");

            return _mapper.Map<UserDto>(userEntity);
        }

        public async Task<UserDto> UpdateUser(UserDto user)
        {
            var entityToUpdate = await _userRepo.Get(user.Id);

            entityToUpdate.UserName = user.UserName;
            entityToUpdate.ProfileImgUrl = user.ProfileImgUrl;
            entityToUpdate.Gender = user.Gender;

            return _mapper.Map<UserDto>(await _userRepo.Update(entityToUpdate));
        }
    }
}
