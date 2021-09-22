using SpSecondHandModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using SpSecondHandModels.Enums;

namespace SpSecondHandApi.Interfaces
{
    public interface ISecondHandService
    {
        Task<SecondHandDto> GetSecondHandById(long id);

        Task<List<SecondHandDto>> GetSecondHand(int catId, int cityId, string keyword, int page, int size,
            SortType sort);

        Task<List<SecondHandDto>> GetSecondHandExcludeCity(int cityId, string keyword, int page, int size,
            SortType sort);

        Task<List<SecondHandDto>> GetSecondHandByUser(long userId, int page, int size);

        Task<SecondHandDto> PublishSecondHand(SecondHandCreateDto shDto);

        Task<SecondHandDto> ModifySecondHand(SecondHandCreateDto shDto);

        Task DeleteSecondHand(long shId);

        Task<List<SecondHandDto>> GetFavorites(long userId);

        Task AddFavorite(long secondHandId, long userId);

        Task RemoveFavorite(long secondHandId, long userId);

        Task<bool> IsFavorite(long secondHandId, long userId);

        Task<List<string>> UploadImg(List<IFormFile> images);

        Task<List<string>> GetStatistics();
    }
}
