using SpSecondHandModels;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace SpSecondHandApi.Interfaces
{
    public interface ISecondHandService
    {
        Task<SecondHandDto> GetSecondHandById(int id);

        Task<List<SecondHandDto>> GetSecondHandByPage(int page, int size);

        Task<List<SecondHandDto>> GetSecondHandByUser(int userId, int page, int size);

        Task<List<SecondHandDto>> GetSecondHandByCity(int cityId, int page, int size);

        Task<SecondHandDto> PublishSecondHand(SecondHandDto shDto);

        Task<SecondHandDto> ModifySecondHand(SecondHandDto shDto);

        Task DeleteSecondHand(int shId);

        Task<List<string>> UploadImg(List<IFormFile> images);
    }
}
