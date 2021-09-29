using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandApi.Controllers
{
    [ApiController]
    [Route("api/chatHistory")]
    public class ChatController : ControllerBase
    {
        public ChatController(ILogger<ChatController> logger, IChatRepository chatRepository)
        {
            _logger = logger;
            _chatRepository = chatRepository;
        }

        [HttpGet]
        public async Task<ActionResult<RespondObject<List<ChatHistoryDto>>>> GetChatHistory(int fromUId, int toUId, int page)
        {
            try
            {
                var chatHistories = await _chatRepository.FindByPage(c =>
                {
                    var fromToCond = c.FromUid == fromUId && c.ToUid == toUId;
                    var toFromCond = c.FromUid == toUId && c.ToUid == fromUId;
                    return fromToCond || toFromCond;
                }, page, 15);
            
                var chatDtoList = chatHistories.Select(c => new ChatHistoryDto()
                {
                    MessageId = c.MessageId,
                    FromUid = c.FromUid,
                    ToUid = c.ToUid,
                    Message = c.Message,
                    Time = c.Time,
                });

                var response = new RespondObject<List<ChatHistoryDto>>()
                {
                    Message = "Success",
                    Data = chatDtoList.ToList()
                };

                return response;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get chat history for id {fromUId}: ", e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<RespondObject<List<ChatHistoryDto>>>> GetChatRoomList(long fromUId)
        {
            try
            {
                var chatHistoryList = await _chatRepository.FindAll(c => c.FromUid == fromUId || c.ToUid == fromUId);
                var chatRooms = chatHistoryList.GroupBy(ch => new
                    {
                        MinId = ch.FromUid <= ch.ToUid ? ch.FromUid : ch.ToUid,
                        MaxId = ch.FromUid > ch.ToUid ? ch.FromUid : ch.ToUid
                    })
                    .Select(g => g.OrderByDescending(c => c.Time).Select(c => new ChatHistoryDto()
                    {
                        MessageId = c.MessageId,
                        FromUid = c.FromUid,
                        ToUid = c.ToUid,
                        Message = c.Message,
                        Time = c.Time,
                        UserName = c.ToUid == fromUId ? c.FromU.UserName : c.ToU.UserName,
                        ProfileImgUrl = c.ToUid == fromUId ? c.FromU.ProfileImgUrl : c.ToU.ProfileImgUrl,
                    }).First()).ToList();

                // Get unread message number
                var tasks = chatRooms.Select(async r =>
                {
                    var senderId = r.ToUid == fromUId ? r.FromUid : r.ToUid;
                    var chatList = await _chatRepository.FindAll(c =>
                        c.FromUid == senderId && c.ToUid == fromUId && c.IsRead == false);
                    r.UnreadMsgNum = chatList.Count();
                    return r;
                });
                var chatRoomList = (await Task.WhenAll(tasks)).ToList();

                var response = new RespondObject<List<ChatHistoryDto>>()
                {
                    Message = "Success",
                    Data = chatRoomList
                };
                return response;
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to get chat rooms for id {fromUId}: ", e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        #region Private

        private readonly ILogger<ChatController> _logger;
        private readonly IChatRepository _chatRepository;

        #endregion
    }
}
