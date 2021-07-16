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
                IsSale = shDto.IsSale,
                Popularity = shDto.Popularity,
            };

            return new SecondHandDto(await _shRepo.Add(newSh));
        }

        public Task<SecondHandDto> ModifySecondHand(SecondHandDto shDto)
        {
            throw new System.NotImplementedException();
        }

        public Task<SecondHandDto> DeleteSecondHand(int shId)
        {
            throw new System.NotImplementedException();
        }
    }
}
