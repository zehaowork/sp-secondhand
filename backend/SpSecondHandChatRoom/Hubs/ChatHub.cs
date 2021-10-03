using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using SpSecondHandChatRoom.Interfaces;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;
using SpSecondHandModels;

namespace SpSecondHandChatRoom.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public ChatHub(ILogger<ChatHub> logger, IChatRepository chatRepository)
        {
            _logger = logger;
            _chatRepository = chatRepository;
        }

        public async Task SendMessage(int fromUId, int toUId, string message)
        {
            try
            {
                //var utcNow = DateTime.UtcNow;
                //var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                //var britishLocalTime = TimeZoneInfo.ConvertTime(utcNow, timeZoneInfo);
                var chat = new ChatHistory()
                {
                    FromUid = fromUId,
                    ToUid = toUId,
                    Message = message,
                    Time = DateTime.UtcNow,
                    IsRead = false
                };

                if (!UserConnections.ContainsKey(toUId))
                {
                    await Clients.Client(UserConnections[fromUId]).ShowMessage(fromUId, toUId, message);
                }
                else
                {
                    var connIds = new List<string>()
                    {
                        UserConnections[toUId],
                        UserConnections[fromUId]
                    };
                    await Clients.Clients(connIds).ShowMessage(fromUId, toUId, message);
                }

                await _chatRepository.Add(chat);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to send message from {fromUId} to {toUId}: {e.Message}");
            }
        }

        public async Task ShareItem(int fromUId, int toUId, ShareItemDto item)
        {
            try
            {
                var serializedItem = JsonConvert.SerializeObject(item);
                //var utcNow = DateTime.UtcNow;
                //var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("GMT Standard Time");
                //var britishLocalTime = TimeZoneInfo.ConvertTime(utcNow, timeZoneInfo);
                var chat = new ChatHistory()
                {
                    FromUid = fromUId,
                    ToUid = toUId,
                    Message = serializedItem,
                    Time = DateTime.UtcNow,
                    IsRead = false
                };

                if (!UserConnections.ContainsKey(toUId))
                {
                    await Clients.Client(UserConnections[fromUId]).ShowItem(fromUId, toUId, serializedItem);
                }
                else
                {
                    var connIds = new List<string>()
                    {
                        UserConnections[toUId],
                        UserConnections[fromUId]
                    };
                    await Clients.Clients(connIds).ShowItem(fromUId, toUId, serializedItem);
                }

                await _chatRepository.Add(chat);
            }
            catch (Exception e)
            {
                _logger.LogError($"Failed to share item from {fromUId} to {toUId}: {e.Message}");
            }
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var uId = Convert.ToInt32(httpContext.Request.Query["uId"]);
            _logger.LogInformation($"{uId} connected to SignalR");

            if (!UserConnections.ContainsKey(uId))
            {
                UserConnections.Add(uId, Context.ConnectionId);
            }
            else
            {
                UserConnections[uId] = Context.ConnectionId;
            }

            await base.OnConnectedAsync();
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var connection = UserConnections.FirstOrDefault(c => c.Value == Context.ConnectionId);
            if (!connection.Equals(default(KeyValuePair<int, string>)))
            {
                UserConnections.Remove(connection.Key);
            }
            
            await base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessageTest(string user, string message)
        {
            await Clients.All.ReceiveMessage(user, message);
        }

        #region private

        private static readonly Dictionary<int, string> UserConnections = new Dictionary<int, string>();
        private readonly ILogger<ChatHub> _logger;
        private readonly IChatRepository _chatRepository;

        #endregion
    }
}