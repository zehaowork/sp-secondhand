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
    [Route("api/chatHistory")]
    public class ChatController : ControllerBase
    {
        public ChatController(ILogger<ChatController> logger, IChatService chatService)
        {
            _logger = logger;
            _chatService = chatService;
        }

        [HttpGet]
        public async Task<ActionResult<RespondObject<List<ChatHistoryDto>>>> GetChatHistory(int fromUId, int toUId, int page)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetChatHistory)} called.");

                return Ok(new RespondObject<List<ChatHistoryDto>>()
                {
                    Message = "Success",
                    Data = await _chatService.GetChatHistory(fromUId, toUId, page)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get chat history for id {fromUId}: ", e.Message);

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to get chat history: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetChatHistory)} complete");
            }
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<RespondObject<List<ChatHistoryDto>>>> GetChatRoomList(long fromUId)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetChatHistory)} called.");

                var response = new RespondObject<List<ChatHistoryDto>>()
                {
                    Message = "Success",
                    Data = await _chatService.GetChatRoomList(fromUId)
                };
                return response;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get chat rooms for id {fromUId}: ", e.Message);

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to get chat history: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetChatHistory)} complete");
            }
        }

        [HttpGet]
        [Route("Search")]
        public async Task<ActionResult<RespondObject<List<ChatHistoryDto>>>> SearchKeyword(int fromUId, string keyword)
        {
            try
            {
                _logger.LogInformation($"{nameof(SearchKeyword)} called.");

                return Ok(new RespondObject<List<ChatHistoryDto>>()
                {
                    Message = "Success",
                    Data = await _chatService.SearchChatHistory(fromUId, keyword)
                });
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to search chat history for user {fromUId}: ", e.Message);

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<SecondHandDto>()
                {
                    Message = $"Failed to search chat history: {e.Message}",
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(SearchKeyword)} complete");
            }
        }

        #region Private

        private readonly ILogger<ChatController> _logger;
        private readonly IChatService _chatService;

        #endregion
    }
}
