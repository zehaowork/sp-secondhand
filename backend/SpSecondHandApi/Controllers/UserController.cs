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
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [HttpGet]
        [Route("openId/{code}")]
        public async Task<ActionResult<RespondObject<string>>> GetOpenId(string code)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetOpenId)} start");

                if (string.IsNullOrWhiteSpace(code))
                    throw new ArgumentException("Code cannot be empty or whitespace.");

                var respObj = new RespondObject<string>()
                {
                    Message = "Success",
                    Data = await _userService.GetWxOpenId(code)
                };
                return Ok(respObj);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to get OpenId: {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<string>()
                {
                    Message = e.Message,
                    Data = string.Empty
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetOpenId)} complete");
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<RespondObject<UserDto>>> GetUserInfoById(long id)
        {
            try
            {
                _logger.LogInformation($"{nameof(GetUserInfoById)} start.");

                return Ok(new RespondObject<UserDto>()
                {
                    Message = "Success",
                    Data = await _userService.GetByUserId(id)
                });
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to get user by guid: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<UserDto>()
                {
                    Message = e.Message,
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetUserInfoById)} complete.");
            }
        }

        [HttpGet]
        public async Task<ActionResult<RespondObject<List<UserDto>>>> GetAllUsers()
        {
            try
            {
                _logger.LogInformation($"{nameof(GetAllUsers)} start.");

                var respObj = new RespondObject<List<UserDto>>
                {
                    Message = "Success",
                    Data = await _userService.GetAllUsers()
                };

                return Ok(respObj);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to get all user: {e.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<List<UserDto>>
                {
                    Message = e.Message,
                    Data = new List<UserDto>()
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(GetAllUsers)} complete.");
            }
        }

        [HttpPost]
        public async Task<ActionResult<RespondObject<UserDto>>> CreateUser(UserDto userToAdd)
        {
            try
            {
                _logger.LogInformation($"{nameof(CreateUser)} start");

                if (string.IsNullOrWhiteSpace(userToAdd.OpenId))
                    throw new ArgumentException("User's OpenId cannot be empty or whitespace.");
                if (string.IsNullOrWhiteSpace(userToAdd.UserName))
                    throw new ArgumentException("User's username cannot be empty or whitespace.");

                var respObj = new RespondObject<UserDto>
                {
                    Message = "Success",
                    Data = await _userService.TryCreateUserRecord(userToAdd)
                };

                return Ok(respObj);
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to create user: {e.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<UserDto>
                {
                    Message = e.Message,
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(CreateUser)} complete");
            }
        }

        [HttpPut]
        public async Task<ActionResult<RespondObject<UserDto>>> UpdateUser(UserDto userInfoToUpdate)
        {
            try
            {
                _logger.LogInformation($"{nameof(UpdateUser)} start.");

                return Ok(new RespondObject<UserDto>()
                {
                    Message = "Success",
                    Data = await _userService.UpdateUser(userInfoToUpdate)
                });
            }
            catch (Exception e)
            {
                _logger.LogError(e, $"Failed to update user info: {e.Message}.");

                return StatusCode(StatusCodes.Status500InternalServerError, new RespondObject<UserDto>()
                {
                    Message = e.Message,
                    Data = null
                });
            }
            finally
            {
                _logger.LogInformation($"{nameof(UpdateUser)} complete.");
            }
        }
    }
}
