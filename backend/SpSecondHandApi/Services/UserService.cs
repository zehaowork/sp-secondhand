using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class UserService : IUserService
    {
        private readonly IWeChatService _weChatService;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public UserService(IWeChatService weChatService, IUserRepository userRepository, IMapper mapper)
        {
            _weChatService = weChatService;
            _userRepo = userRepository;
            _mapper = mapper;
        }

        public async Task<string> GetWxOpenId(string code)
        {
            return await _weChatService.GetWxOpenId(code);
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
