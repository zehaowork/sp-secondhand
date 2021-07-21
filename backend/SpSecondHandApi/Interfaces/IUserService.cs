using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandModels;

namespace SpSecondHandApi.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// Get openid and session key from WeChat server using the code generated in miniprogram.
        /// </summary>
        /// <param name="code">Code generated in miniprogram.</param>
        /// <returns></returns>
        Task<string> GetWxOpenId(string code);

        /// <summary>
        /// Create user record if doesn't exist in database.
        /// </summary>
        /// <param name="userInfo">Details of the user</param>
        /// <returns></returns>
        Task<UserDto> TryCreateUserRecord(UserDto userInfo);

        /// <summary>
        /// Get all user record of specified appID.
        /// </summary>
        /// /// <returns></returns>
        Task<List<UserDto>> GetAllUsers();

        /// <summary>
        /// Get user of specified id from app of specified appID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<UserDto> GetByUserId(long id);

        /// <summary>
        /// Update user.
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        Task<UserDto> UpdateUser(UserDto userInfo);
    }
}
