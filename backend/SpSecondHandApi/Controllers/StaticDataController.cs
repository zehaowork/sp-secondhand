using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpSecondHandApi.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Controllers
{
    [ApiController]
    [Route("api/staticData")]
    public class StaticDataController : ControllerBase
    {
        private readonly ILogger<StaticDataController> _logger;
        private readonly IStaticDataServices _staticDataService;

        public StaticDataController(ILogger<StaticDataController> logger, IStaticDataServices staticDataService)
        {
            _logger = logger;
            _staticDataService = staticDataService;
        }

        [HttpGet]
        [Route("categories")]
        public async Task<ActionResult<RespondObject<List<CategoryDto>>>> GetCategories()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetCategories)} called.");

                return Ok(new RespondObject<List<CategoryDto>>()
                {
                    Message = "Success",
                    Data = await _staticDataService.GetCategories()
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get items: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<CategoryDto>>()
                {
                    Message = $"Failed to get items: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetCategories)} complete");
            }
        }

        [HttpGet]
        [Route("cities")]
        public async Task<ActionResult<RespondObject<List<CityDto>>>> GetCities()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetCities)} called.");

                return Ok(new RespondObject<List<CityDto>>()
                {
                    Message = "Success",
                    Data = await _staticDataService.GetCities()
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get cities: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<CityDto>>()
                {
                    Message = $"Failed to get cities: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetCities)} complete");
            }
        }

        [HttpGet]
        [Route("cities/{countryId:int}")]
        public async Task<ActionResult<RespondObject<List<CityDto>>>> GetCitiesByCountryId(int countryId)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetCitiesByCountryId)} called.");

                return Ok(new RespondObject<List<CityDto>>()
                {
                    Message = "Success",
                    Data = await _staticDataService.GetCitiesByCountryId(countryId)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get cities by country id: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<CityDto>>()
                {
                    Message = $"Failed to get cities by country id: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetCitiesByCountryId)} complete");
            }
        }

        [HttpPut]
        [Route("cities")]
        public async Task<ActionResult<RespondObject<CityDto>>> SetCityPopular(int cityId, bool isPopular)
        {
            try
            {
                _logger.LogInformation($"{nameof(SetCityPopular)} called.");

                return Ok(new RespondObject<CityDto>()
                {
                    Message = "Success",
                    Data = await _staticDataService.SetCityPopular(cityId, isPopular)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to set city popular: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<CityDto>()
                {
                    Message = $"Failed to set city popular: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(SetCityPopular)} complete");
            }
        }

        [HttpGet]
        [Route("banners")]
        public async Task<ActionResult<RespondObject<List<BannerDto>>>> GetBanners()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetBanners)} called.");

                return Ok(new RespondObject<List<BannerDto>>()
                {
                    Message = "Success",
                    Data = await _staticDataService.GetBanners()
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get banners: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<BannerDto>>()
                {
                    Message = $"Failed to get banners: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetBanners)} complete");
            }
        }

        [HttpPut]
        [Route("banners")]
        public async Task<ActionResult<RespondObject<BannerDto>>> ModifyBanner(BannerDto banner)
        {
            try
            {
                _logger.LogInformation($"{nameof(ModifyBanner)} called.");

                return Ok(new RespondObject<BannerDto>()
                {
                    Message = "Success",
                    Data = await _staticDataService.UpdateBanner(banner)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to modify banner: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<BannerDto>()
                {
                    Message = $"Failed to modify banner: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(ModifyBanner)} complete");
            }
        }

        #region Recommended Search

        [HttpGet]
        [Route("recommendedSearch")]
        public async Task<ActionResult<RespondObject<List<RecommendedSearchDto>>>> GetRecommendedSearches()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetRecommendedSearches)} called.");

                return Ok(new RespondObject<List<RecommendedSearchDto>>()
                {
                    Message = "Success",
                    Data = await _staticDataService.GetRecommendedSearches()
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get searches: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<RecommendedSearchDto>>()
                {
                    Message = $"Failed to get searches: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetRecommendedSearches)} complete");
            }
        }

        [HttpPost]
        [Route("recommendedSearch")]
        public async Task<ActionResult<RespondObject<RecommendedSearchDto>>> AddRecommendedSearch(RecommendedSearchDto search)
        {
            try
            {
                _logger.LogInformation($"{nameof(AddRecommendedSearch)} called.");

                return Ok(new RespondObject<RecommendedSearchDto>()
                {
                    Message = "Success",
                    Data = await _staticDataService.AddRecommendedSearch(search)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add search: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<RecommendedSearchDto>()
                {
                    Message = $"Failed to add search: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(AddRecommendedSearch)} complete.");
            }
        }

        [HttpPut]
        [Route("recommendedSearch")]
        public async Task<ActionResult<RespondObject<RecommendedSearchDto>>> UpdateRecommendedSearch(RecommendedSearchDto search)
        {
            try
            {
                _logger.LogInformation($"{nameof(UpdateRecommendedSearch)} called.");

                return Ok(new RespondObject<RecommendedSearchDto>()
                {
                    Message = "Success",
                    Data = await _staticDataService.UpdateRecommendedSearch(search)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to update search: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<RecommendedSearchDto>()
                {
                    Message = $"Failed to update search: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(UpdateRecommendedSearch)} complete.");
            }
        }

        [HttpDelete]
        [Route("recommendedSearch")]
        public async Task<ActionResult<RespondObject<string>>> DeleteRecommendedSearch(int rsId)
        {
            try
            {
                _logger.LogInformation($"{nameof(DeleteRecommendedSearch)} called.");

                await _staticDataService.DeleteRecommendedSearch(rsId);

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = $"Recommended search {rsId} successfully deleted."
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to delete search: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to delete search: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(DeleteRecommendedSearch)} complete");
            }
        }

        #endregion
    }
}
