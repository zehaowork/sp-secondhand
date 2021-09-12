using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpSecondHandApi.Interfaces;
using SpSecondHandModels;
using SpSecondHandModels.Enums;

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

        #region Second Hand

        [HttpGet]
        [Route("id/{shId:long}")]
        public async Task<ActionResult<RespondObject<SecondHandDto>>> GetSecondHand(long shId)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetSecondHand)} called.");

                return Ok(new RespondObject<SecondHandDto>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHandById(shId)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand item by id: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to get second hand item by id: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetSecondHand)} complete");
            }
        }

        [HttpGet]
        public async Task<ActionResult<RespondObject<List<SecondHandDto>>>> GetSecondHandList(int catId, int cityId, string keyword, int page = 0, int size = 5, SortType sort = SortType.TimeDesc)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetSecondHandList)} called.");

                return Ok(new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHand(catId, cityId, keyword, page, size, sort)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand items: {e.Message}");
                
                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get second hand items: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetSecondHandList)} complete");
            }
        }

        [HttpGet]
        [Route("user/{userId:long}")]
        public async Task<ActionResult<RespondObject<List<SecondHandDto>>>> GetSecondHandListByUser(long userId, int page = 0, int size = 5)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetSecondHandListByUser)} called.");

                return Ok(new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetSecondHandByUser(userId, page, size)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get second hand items by user: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get second hand items by user: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetSecondHandListByUser)} complete");
            }
        }

        [HttpPost]
        public async Task<ActionResult<RespondObject<SecondHandDto>>> PublishSecondHand(SecondHandCreateDto secondHand)
        {
            try
            {
                _logger.LogInformation($"{nameof(PublishSecondHand)} called.");

                return Ok(new RespondObject<SecondHandDto>()
                {
                    Message = "Success",
                    Data = await _shService.PublishSecondHand(secondHand)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to publish second hand item: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to publish second hand item: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(PublishSecondHand)} complete.");
            }
        }

        [HttpPut]
        public async Task<ActionResult<RespondObject<SecondHandDto>>> ModifySecondHand(SecondHandCreateDto secondHand)
        {
            try
            {
                _logger.LogInformation($"{nameof(ModifySecondHand)} called.");

                return Ok(new RespondObject<SecondHandDto>()
                {
                    Message = "Success",
                    Data = await _shService.ModifySecondHand(secondHand)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to modify second hand item: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to modify second hand item: { e.Message}.",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(ModifySecondHand)} complete.");
            }
        }

        [HttpDelete]
        public async Task<ActionResult<RespondObject<string>>> DeleteSecondHand(long secondHandId)
        {
            try
            {
                _logger.LogInformation($"{nameof(DeleteSecondHand)} called.");

                await _shService.DeleteSecondHand(secondHandId);

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = $"Second hand item {secondHandId} successfully deleted."
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to delete second hand item: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to delete second hand item: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(DeleteSecondHand)} complete");
            }
        }

        #endregion

        #region Favorite

        [HttpGet]
        [Route("favorite/{userId:long}")]
        public async Task<ActionResult<RespondObject<List<SecondHandDto>>>> GetFavorites(long userId)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetFavorites)} called.");

                return Ok(new RespondObject<List<SecondHandDto>>()
                {
                    Message = "Success",
                    Data = await _shService.GetFavorites(userId)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get favorite second hand items: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<SecondHandDto>>()
                {
                    Message = $"Failed to get favorite second hand items: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetFavorites)} complete");
            }
        }

        [HttpPost]
        [Route("favorite")]
        public async Task<ActionResult<RespondObject<string>>> AddFavorite(FavoriteDto fav)
        {
            try
            {
                _logger.LogInformation($"{nameof(AddFavorite)} called.");

                await _shService.AddFavorite(fav.SecondHandId, fav.UserId);

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = "Successfully added to favorite"
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to add favorite second hand item: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to add favorite second hand item: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(AddFavorite)} complete");
            }
        }

        [HttpDelete]
        [Route("favorite")]
        public async Task<ActionResult<RespondObject<string>>> DeleteFavorite(int secondHandId, int userId)
        {
            try
            {
                _logger.LogInformation($"{nameof(DeleteFavorite)} called.");

                await _shService.RemoveFavorite(secondHandId, userId);

                return Ok(new RespondObject<string>()
                {
                    Message = "Success",
                    Data = "Successfully removed from favorite"
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to remove favorite second hand item: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to remove favorite second hand item: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(DeleteFavorite)} complete");
            }
        }

        [HttpPost]
        [Route("isFavorite")]
        public async Task<ActionResult<RespondObject<bool>>> IsFavorite(FavoriteDto fav)
        {
            try
            {
                _logger.LogInformation($"{nameof(IsFavorite)} called.");

                return Ok(new RespondObject<bool>()
                {
                    Message = "Success",
                    Data = await _shService.IsFavorite(fav.SecondHandId, fav.UserId)
            });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to check favorite: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to check favorite: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(IsFavorite)} complete");
            }
        }

        #endregion

        [HttpPost]
        [Route("uploadImage")]
        public async Task<ActionResult<RespondObject<List<ImgUrlDto>>>> UploadImages()
        {
            try
            {
                _logger.LogInformation("UploadImages start.");

                var images = Request.Form.Files.ToList();
                var id = Request.Form["id"].ToString();

                if (images.Count == 0)
                    throw new ArgumentException("Uploaded resource is empty.");

                var imgUrls = await _shService.UploadImg(images);

                return Ok(new RespondObject<List<ImgUrlDto>>()
                {
                    Message = "Success",
                    Data = imgUrls.Select(url => new ImgUrlDto()
                    {
                        ImgUrl = url,
                        Id = id
                    }).ToList()
                });
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to upload image: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = e.Message,
                    Data = "Failed to upload image(s)."
                });
            }
            finally
            {
                _logger.LogInformation("UploadImages complete.");
            }
        }

        [HttpGet]
        [Route("statistics")]
        public async Task<ActionResult<RespondObject<List<string>>>> GetStatistics()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetStatistics)} called.");

                return Ok(new RespondObject<List<string>>()
                {
                    Message = "Success",
                    Data = await _shService.GetStatistics()
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get statistics: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = $"Failed to get statistics: { e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetStatistics)} complete");
            }
        }
    }
}
