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
    }
}
