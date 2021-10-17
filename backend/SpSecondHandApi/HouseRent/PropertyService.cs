using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Entities.HouseRent;
using SpSecondHandDb.HouseRent;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels.Enums;
using SpSecondHandModels.HouseRent;

namespace SpSecondHandApi.HouseRent
{
    public class PropertyService : IPropertyService
    {
        public PropertyService(IPropertyRepository propertyRepo, IUserRepository userRepo, IStaticDataRepository staticDataRepo, IMapper mapper)
        {
            _propertyRepo = propertyRepo;
            _userRepo = userRepo;
            _staticDataRepo = staticDataRepo;
            _mapper = mapper;
        }

        public async Task<PropertyDto> GetPropertyById(long id)
        {
            var property = await _propertyRepo.Get(id);

            if (property == null)
            {
                throw new ArgumentException($"Property {id} doesn't exist.");
            }

            property.Popularity++;
            await _propertyRepo.Update(property);

            return _mapper.Map<PropertyDto>(property);
        }

        public async Task<List<PropertyDto>> GetProperty(int cityId, string keyword, int page, int size, SortType sort)
        {
            Func<Property, bool> predicate = sh =>
            {
                var match =  cityId == 0 || sh.City.Id == cityId;
                match = match && (string.IsNullOrWhiteSpace(keyword) || sh.Title.Contains(keyword));

                return match;
            };

            ProcessSorting(sort, out var orderBy, out var isDesc);
            var propertyList = await _propertyRepo.FindAllWithSorting(predicate, orderBy, isDesc, page, size);

            return propertyList.Select(sh => _mapper.Map<PropertyDto>(sh)).ToList();
        }

        public async Task<List<PropertyDto>> GetPropertyExcludeCity(int cityId, string keyword, int page, int size, SortType sort)
        {
            Func<Property, bool> predicate = sh =>
            {
                var match = sh.City.Id != cityId;
                match = match && (string.IsNullOrWhiteSpace(keyword) || sh.Title.Contains(keyword));

                return match;
            };

            ProcessSorting(sort, out var orderBy, out var isDesc);
            var propertyList = await _propertyRepo.FindAllWithSorting(predicate, orderBy, isDesc, page, size);

            return propertyList.Select(sh => _mapper.Map<PropertyDto>(sh)).ToList();
        }

        public async Task<List<PropertyDto>> GetPropertyByUser(long userId, int page, int size)
        {
            var propertyList = await _propertyRepo.FindAll(sh => sh.User.Id == userId, page, size);

            return propertyList.Select(sh => _mapper.Map<PropertyDto>(sh)).ToList();
        }

        public async Task<PropertyDto> PublishProperty(PropertyCreateDto propertyDto)
        {
            var newProp = _mapper.Map<Property>(propertyDto);
            newProp.City = await TryGetCity(propertyDto.CityId);
            newProp.User = await TryGetUser(propertyDto.UserId);

            return _mapper.Map<PropertyDto>(await _propertyRepo.Add(newProp));
        }

        public async Task<PropertyDto> ModifyProperty(PropertyCreateDto propertyDto)
        {
            var property = await _propertyRepo.Get(propertyDto.Id);
            if (property == null)
            {
                throw new ArgumentException($"Property of id {propertyDto.Id} doesn't exist.");
            }

            property.Title = propertyDto.Title;
            property.ImgUrls = string.Join(',', propertyDto.ImgUrls);
            property.Description = propertyDto.Description;
            property.WeChatId = propertyDto.WeChatId;
            property.Telephone = propertyDto.Telephone;
            property.PricePerWeek = propertyDto.PricePerWeek;
            property.StartDate = propertyDto.StartDate;
            property.EndDate = propertyDto.EndDate;
            property.Address = propertyDto.Address;
            property.RoomType = (int) propertyDto.RoomType;
            property.BuildingType = (int) propertyDto.BuildingType;
            property.Facilities = string.Join(',', propertyDto.Facilities);

            if (property.City.Id != propertyDto.CityId)
            {
                property.City = await TryGetCity(propertyDto.CityId);
            }

            return _mapper.Map<PropertyDto>(await _propertyRepo.Update(property));
        }

        public async Task DeleteProperty(long id)
        {
            var property = await _propertyRepo.Get(id);
            if (property == null)
            {
                throw new ArgumentException($"Property of id {id} doesn't exist.");
            }

            await _propertyRepo.Delete(property);
        }

        #region Private

        private async Task<City> TryGetCity(int id)
        {
            var city = await _staticDataRepo.GetCityById(id);
            if (city == null)
            {
                throw new ArgumentException($"City {id} doesn't exist.");
            }

            return city;
        }

        private async Task<User> TryGetUser(long id)
        {
            var user = await _userRepo.Get(id);
            if (user == null)
            {
                throw new ArgumentException($"User {id} doesn't exist.");
            }

            return user;
        }

        private void ProcessSorting(SortType sort, out Func<Property, dynamic> orderBy, out bool isDesc)
        {
            isDesc = true;
            switch (sort)
            {
                case SortType.PopularityDesc:
                    orderBy = p => p.Popularity;
                    break;
                case SortType.PriceDesc:
                    orderBy = p => p.PricePerWeek;
                    break;
                case SortType.PopularityAsc:
                    isDesc = false;
                    orderBy = p => p.Popularity;
                    break;
                case SortType.PriceAsc:
                    isDesc = false;
                    orderBy = p => p.PricePerWeek;
                    break;
                case SortType.TimeDesc:
                default:
                    orderBy = p => p.PublishTime;
                    break;
            }
        }

        private readonly IPropertyRepository _propertyRepo;
        private readonly IUserRepository _userRepo;
        private readonly IStaticDataRepository _staticDataRepo;
        private readonly IMapper _mapper;

        #endregion
    }
}
