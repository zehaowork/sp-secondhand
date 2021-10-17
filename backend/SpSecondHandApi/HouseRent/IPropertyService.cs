using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandModels.Enums;
using SpSecondHandModels.HouseRent;

namespace SpSecondHandApi.HouseRent
{
    public interface IPropertyService
    {
        Task<PropertyDto> GetPropertyById(long id);
        Task<List<PropertyDto>> GetProperty(int cityId, string keyword, int page, int size, SortType sort);
        Task<List<PropertyDto>> GetPropertyExcludeCity(int cityId, string keyword, int page, int size, SortType sort);
        Task<List<PropertyDto>> GetPropertyByUser(long userId, int page, int size);
        Task<PropertyDto> PublishProperty(PropertyCreateDto propertyDto);
        Task<PropertyDto> ModifyProperty(PropertyCreateDto propertyDto);
        Task DeleteProperty(long id);
    }
}
