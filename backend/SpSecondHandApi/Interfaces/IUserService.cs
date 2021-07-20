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
        /// <param name="appGuid"></param>
        /// /// <returns></returns>
        Task<List<UserDto>> GetAllUsers();

        /// <summary>
        /// Get user of specified id from app of specified appID.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<UserDto> GetByUserId(Guid id);

        /// <summary>
        /// Update user.
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        Task<UserDto> UpdateUserInfo(UserDto userInfo);

        /// <summary>
        /// Gets all user recipients of specified user.
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        Task<List<UserContactDto>> GetUserRecipients(Guid userId);

        /// <summary>
        /// Stores a new user recipient to the database.
        /// </summary>
        /// <param name="recipientDto">Details of the user recipient</param>
        /// <returns></returns>
        Task<UserContactDto> CreateUserRecipient(UserContactDto recipientDto);

        /// <summary>
        /// Updates the user recipient.
        /// </summary>
        /// <param name="recipientDto">Details of the user recipient</param>
        /// <returns></returns>
        Task<UserContactDto> UpdateUserRecipient(UserContactDto recipientDto);

        /// <summary>
        /// Deletes the user recipient from database.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="recipientId"></param>
        /// <returns></returns>
        Task DeleteUserRecipient(Guid userId, int recipientId);
    }
}
