using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class SecondHandService : ISecondHandService
    {
        public SecondHandService(IWeChatService weChatService, ISecondHandRepository shRepo, IUserRepository userRepo, IStaticDataRepository staticDataRepo, IMapper mapper)
        {
            _weChatService = weChatService;
            _shRepo = shRepo;
            _userRepo = userRepo;
            _staticDataRepo = staticDataRepo;
            _mapper = mapper;
        }

        #region Second Hand

        public async Task<SecondHandDto> GetSecondHandById(long id)
        {
            var shItem = await _shRepo.Get(id);

            if (shItem == null)
            {
                throw new ArgumentException($"Second hand item {id} doesn't exist.");
            }

            shItem.Popularity++;
            await _shRepo.Update(shItem);

            return _mapper.Map<SecondHandDto>(shItem);
        }

        public async Task<List<SecondHandDto>> GetSecondHand(int catId, int cityId, string keyword, int page, int size)
        {
            Func<SecondHand, bool> predicate = sh =>
            {
                var match = catId == 0 || sh.Category.Id == catId;
                match = match && (cityId == 0 || sh.City.Id == cityId);
                match = match && (string.IsNullOrWhiteSpace(keyword) || sh.Title.Contains(keyword));

                return match;
            };
            var shList = await _shRepo.FindAll(predicate, page, size);

            return shList.Select(sh => _mapper.Map<SecondHandDto>(sh)).ToList();
        }

        public async Task<List<SecondHandDto>> GetSecondHandByUser(long userId, int page, int size)
        {
            var shList = await _shRepo.FindAll(sh => sh.User.Id == userId , page, size);

            return shList.Select(sh => _mapper.Map<SecondHandDto>(sh)).ToList();
        }

        public async Task<SecondHandDto> PublishSecondHand(SecondHandCreateDto shDto)
        {
            var newSh = _mapper.Map<SecondHand>(shDto);
            newSh.Category = await TryGetCategory(shDto.CategoryId);
            newSh.City = await TryGetCity(shDto.CityId);
            newSh.User = await TryGetUser(shDto.UserId);

            return _mapper.Map<SecondHandDto>(await _shRepo.Add(newSh));
        }

        public async Task<SecondHandDto> ModifySecondHand(SecondHandCreateDto shDto)
        {
            var sh = await _shRepo.Get(shDto.Id);
            if (sh == null)
            {
                throw new ArgumentException($"Second hand item of id {shDto.Id} doesn't exist.");
            }

            sh.Title = shDto.Title;
            sh.ImgUrls = shDto.ImgUrls;
            sh.Description = shDto.Description;
            sh.WeChatId = shDto.WeChatId;
            sh.Telephone = shDto.Telephone;
            sh.Price = shDto.Price;
            sh.Type = shDto.Type;
            sh.Address = shDto.Address;
            sh.IsSold = shDto.IsSold;

            if (sh.Category.Id != shDto.CategoryId)
            {
                sh.Category = await TryGetCategory(shDto.CategoryId);
            }

            if (sh.City.Id != shDto.CityId)
            {
                sh.City = await TryGetCity(shDto.CityId);
            }

            return _mapper.Map<SecondHandDto>(await _shRepo.Update(sh));
        }

        public async Task DeleteSecondHand(long shId)
        {
            var sh = await _shRepo.Get(shId);
            if (sh == null)
            {
                throw new ArgumentException($"Second hand item of id {shId} doesn't exist.");
            }

            await _shRepo.Delete(sh);
        }

        #endregion

        #region Favorite

        public async Task<List<SecondHandDto>> GetFavorites(long userId, int page, int size)
        {
            var fav = await _shRepo.GetFavoriteSecondHands(userId);

            return fav.Skip(page * size).Take(size).Select(sh => _mapper.Map<SecondHandDto>(sh)).ToList();
        }

        public async Task AddFavorite(long secondHandId, long userId)
        {
            await _shRepo.AddFavorite(secondHandId, userId);
        }

        public async Task RemoveFavorite(long secondHandId, long userId)
        {
            await _shRepo.RemoveFavorite(secondHandId, userId);
        }

        public async Task<bool> IsFavorite(long secondHandId, long userId)
        {
            return await _shRepo.IsFavorite(secondHandId, userId);
        }

        #endregion

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
                if (await _weChatService.ImgSecCheck(btData))
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

        public async Task<List<string>> GetStatistics()
        {
            var shList = (await _shRepo.GetAll()).ToList();
            var totalSecondHands = shList.Count;
            var yesterdayShIncrease = shList.Where(s => s.PublishTime == DateTime.Today.AddDays(-1)).ToList().Count;
            var weekShIncrease = shList.Where(s => s.PublishTime >= DateTime.Today.AddDays(-7)).ToList().Count;

            var userList = (await _userRepo.GetAll()).ToList();
            var totalUsers = userList.Count;
            var yesterdayUserIncrease = userList.Where(s => s.JoinTime == DateTime.Today.AddDays(-1)).ToList().Count;
            var weekUserIncrease = userList.Where(s => s.JoinTime >= DateTime.Today.AddDays(-7)).ToList().Count;

            return new List<string>()
            {
                $"总闲置数：{totalSecondHands}",
                $"昨日闲置新增：{yesterdayShIncrease}",
                $"上周闲置新增：{weekShIncrease}",
                $"总用户数：{totalUsers}",
                $"昨日用户新增：{yesterdayUserIncrease}",
                $"上周用户新增：{weekUserIncrease}"
            };
        }

        #region Private

        public async Task<Category> TryGetCategory(int id)
        {
            var cat = await _staticDataRepo.GetCategoryById(id);
            if (cat == null)
            {
                throw new ArgumentException($"Category {id} doesn't exist.");
            }

            return cat;
        }

        public async Task<City> TryGetCity(int id)
        {
            var city = await _staticDataRepo.GetCityById(id);
            if (city == null)
            {
                throw new ArgumentException($"City {id} doesn't exist.");
            }

            return city;
        }

        public async Task<User> TryGetUser(long id)
        {
            var user = await _userRepo.Get(id);
            if (user == null)
            {
                throw new ArgumentException($"User {id} doesn't exist.");
            }

            return user;
        }

        private readonly IWeChatService _weChatService;
        private readonly ISecondHandRepository _shRepo;
        private readonly IUserRepository _userRepo;
        private readonly IStaticDataRepository _staticDataRepo;
        private readonly IMapper _mapper;

        #endregion
    }
}
