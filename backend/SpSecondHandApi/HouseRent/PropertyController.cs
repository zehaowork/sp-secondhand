using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpSecondHandModels;
using SpSecondHandModels.Enums;
using SpSecondHandModels.HouseRent;

namespace SpSecondHandApi.HouseRent
{
    [ApiController]
    [Route("api/property")]
    public class PropertyController : ControllerBase
    {
        private readonly ILogger<PropertyController> _logger;
        private readonly IPropertyService _propService;

        public PropertyController(ILogger<PropertyController> logger, IPropertyService propService)
        {
            _logger = logger;
            _propService = propService;
        }

        [HttpGet]
        [Route("id/{propId:long}")]
        public async Task<ActionResult<RespondObject<PropertyDto>>> GetProperty(long propId)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetProperty)} called.");

                return Ok(new RespondObject<PropertyDto>()
                {
                    Message = "Success",
                    Data = await _propService.GetPropertyById(propId)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get property by id: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<PropertyDto>()
                {
                    Message = $"Failed to get property by id: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetProperty)} complete");
            }
        }

        [HttpGet]
        public async Task<ActionResult<RespondObject<List<PropertyDto>>>> GetPropertyList(int cityId, string keyword, int page = 0, int size = 5, SortType sort = SortType.TimeDesc)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetPropertyList)} called.");

                return Ok(new RespondObject<List<PropertyDto>>()
                {
                    Message = "Success",
                    Data = await _propService.GetProperty(cityId, keyword, page, size, sort)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get properties: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<PropertyDto>>()
                {
                    Message = $"Failed to get properties: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetPropertyList)} complete");
            }
        }

        [HttpGet]
        [Route("excludeCity")]
        public async Task<ActionResult<RespondObject<List<PropertyDto>>>> GetPropertyListExcludeCity(int cityId, string keyword, int page = 0, int size = 5, SortType sort = SortType.TimeDesc)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetPropertyListExcludeCity)} called.");

                return Ok(new RespondObject<List<PropertyDto>>()
                {
                    Message = "Success",
                    Data = await _propService.GetPropertyExcludeCity(cityId, keyword, page, size, sort)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get properties excluding city {cityId}: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<PropertyDto>>()
                {
                    Message = $"Failed to get properties excluding city {cityId}: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetPropertyListExcludeCity)} complete");
            }
        }

        [HttpGet]
        [Route("user/{userId:long}")]
        public async Task<ActionResult<RespondObject<List<PropertyDto>>>> GetPropertyListByUser(long userId, int page = 0, int size = 5)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetPropertyListByUser)} called.");

                return Ok(new RespondObject<List<PropertyDto>>()
                {
                    Message = "Success",
                    Data = await _propService.GetPropertyByUser(userId, page, size)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to properties by user: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<PropertyDto>>()
                {
                    Message = $"Failed to get properties by user: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetPropertyListByUser)} complete");
            }
        }

        [HttpPost]
        public async Task<ActionResult<RespondObject<PropertyDto>>> PublishProperty(PropertyCreateDto property)
        {
            try
            {
                _logger.LogInformation($"{nameof(PublishProperty)} called.");

                return Ok(new RespondObject<PropertyDto>()
                {
                    Message = "Success",
                    Data = await _propService.PublishProperty(property)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to publish property: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<PropertyDto>()
                {
                    Message = $"Failed to publish property: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(PublishProperty)} complete.");
            }
        }

        [HttpPost]
        [Route("bundle")]
        public async Task<ActionResult<RespondObject<string>>> PublishProperties(List<PropertyCreateDto> properties)
        {
            var index = 0;
            try
            {
                _logger.LogInformation($"{nameof(PublishProperties)} called.");

                foreach (var sh in properties)
                {
                    await _propService.PublishProperty(sh);
                    index++;
                }

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = "All properties successfully published."
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to publish property: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to publish properties from index {index}: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(PublishProperties)} complete.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<RespondObject<PropertyDto>>> ModifyProperty(PropertyCreateDto property)
        {
            try
            {
                _logger.LogInformation($"{nameof(ModifyProperty)} called.");

                return Ok(new RespondObject<PropertyDto>()
                {
                    Message = "Success",
                    Data = await _propService.ModifyProperty(property)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to modify property: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<PropertyDto>()
                {
                    Message = $"Failed to modify property: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(ModifyProperty)} complete.");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<RespondObject<string>>> DeleteProperty(long propertyId)
        {
            try
            {
                _logger.LogInformation($"{nameof(DeleteProperty)} called.");

                await _propService.DeleteProperty(propertyId);

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = $"Property {propertyId} successfully deleted."
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to delete property: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to delete property: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(DeleteProperty)} complete");
            }
        }

    }
}
