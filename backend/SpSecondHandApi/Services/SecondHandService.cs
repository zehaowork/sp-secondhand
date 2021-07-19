using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SpSecondHandApi.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Services
{
    public class SecondHandService : ISecondHandService
    {
        private readonly ISecondHandRepository _shRepo;

        public SecondHandService(ISecondHandRepository shRepo)
        {
            _shRepo = shRepo;
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
    }
}
