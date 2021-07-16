using SpSecondHandModels;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SpSecondHandApi.Interfaces
{
    public interface ISecondHandService
    {
        Task<List<SecondHandDto>> GetSecondHandByPage(int page, int size);

        Task<List<SecondHandDto>> GetSecondHandByUser(int userId);

        Task<List<SecondHandDto>> GetSecondHandByCity(int cityId);

        Task<SecondHandDto> PublishSecondHand(SecondHandDto shDto);

        Task<SecondHandDto> ModifySecondHand(SecondHandDto shDto);

        Task<SecondHandDto> DeleteSecondHand(int shId);
    }
}
