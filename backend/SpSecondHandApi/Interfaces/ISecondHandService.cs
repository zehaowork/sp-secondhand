using SpSecondHandModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SpSecondHandApi.Interfaces
{
    public interface ISecondHandService
    {
        Task<SecondHandDto> GetSecondHandById(int id);

        Task<List<SecondHandDto>> GetSecondHand(int catId, int cityId, string keyword, int page, int size);

        Task<List<SecondHandDto>> GetSecondHandByUser(int userId, int page, int size);

        Task<SecondHandDto> PublishSecondHand(SecondHandDto shDto);

        Task<SecondHandDto> ModifySecondHand(SecondHandDto shDto);

        Task DeleteSecondHand(int shId);

        Task<List<SecondHandDto>> GetFavorites(int userId, int page, int size);

        Task AddFavorite(int secondHandId, int userId);

        Task RemoveFavorite(int secondHandId, int userId);

        Task<bool> IsFavorite(int secondHandId, int userId);

        Task<List<string>> UploadImg(List<IFormFile> images);

        Task<List<string>> GetStatistics();
    }
}
