using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface IUserRepository : IBaseRepository<User>
    {
        /// <summary>
        /// Get all users from database.
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<User>> GetAll();

        /// <summary>
        /// Find all user that matches specified condition.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        Task<IEnumerable<User>> FindAll(Func<User, bool> predicate);

        /// <summary>
        /// Find first user that matches specified condition.
        /// </summary>
        /// <param name="predicate"></param>
        /// <returns></returns>
        Task<User> FindFirst(Func<User, bool> predicate);
    }
}
