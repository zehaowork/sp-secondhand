using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpSecondHandApi.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Controllers
{
    [ApiController]
    [Route("api/secondHand")]
    public class SecondHandController : ControllerBase
    {
        private readonly ILogger<SecondHandController> _logger;
        private readonly ISecondHandService _shService;

        public SecondHandController(ILogger<SecondHandController> logger, ISecondHandService shService)
        {
            _logger = logger;
            _shService = shService;
        }

        [HttpGet]
        public async Task<RespondObject<List<SecondHandDto>>> GetSecondList(int page, int size)
        {
            try
            {
                _logger.LogInformation("GetSecondList called.");

                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHandByPage(page, size)
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand items: {e.Message}");
                
                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get second hand items: {e.Message}",
                    Data = null
                };
            }
        }

        [HttpGet]
        [Route("user/{userId:int}")]
        public async Task<RespondObject<List<SecondHandDto>>> GetSecondListByUser(int userId, int page, int size)
        {
            try
            {
                _logger.LogInformation("GetSecondListByUser called.");

                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHandByUser(userId, page, size)
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand items by user: {e.Message}");

                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get second hand items by user: {e.Message}",
                    Data = null
                };
            }
        }

        [HttpGet]
        [Route("city/{cityId:int}")]
        public async Task<RespondObject<List<SecondHandDto>>> GetSecondListByCity(int cityId, int page, int size)
        {
            try
            {
                _logger.LogInformation("GetSecondListByCity called.");

                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHandByCity(cityId, page, size)
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand items by city: {e.Message}");

                return new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get second hand items by city: { e.Message}",
                    Data = null
                };
            }
        }

        [HttpPost]
        public async Task<RespondObject<SecondHandDto>> PublishSecondHand(SecondHandDto secondHand)
        {
            try
            {
                _logger.LogInformation("PublishSecondHand called.");

                return new RespondObject<SecondHandDto>()
                {
                    Message = "Success",
                    Data = await _shService.PublishSecondHand(secondHand)
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to publish second hand item: {e.Message}");

                return new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to publish second hand item: { e.Message}",
                    Data = null
                };
            }
        }

        [HttpPut]
        public async Task<RespondObject<SecondHandDto>> ModifySecondHand(SecondHandDto secondHand)
        {
            try
            {
                _logger.LogInformation("ModifySecondHand called.");

                return new RespondObject<SecondHandDto>()
                {
                    Message = "Success",
                    Data = await _shService.ModifySecondHand(secondHand)
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to modify second hand item: {e.Message}");

                return new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to modify second hand item: { e.Message}",
                    Data = null
                };
            }
        }

        [HttpDelete]
        public async Task<RespondObject<string>> DeleteSecondHand(int secondHandId)
        {
            try
            {
                _logger.LogInformation("DeleteSecondHand called.");

                await _shService.DeleteSecondHand(secondHandId);

                return new RespondObject<string>()
                {
                    Message = "Success",
                    Data = $"Second hand item {secondHandId} successfully deleted."
                };
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to delete second hand item: {e.Message}");

                return new RespondObject<string>()
                {
                    Message = $"Failed to delete second hand item: { e.Message}",
                    Data = null
                };
            }
        }
    }
}
