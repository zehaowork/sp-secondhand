using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities;

namespace SpSecondHandDb.Interfaces
{
    public interface ISecondHandRepository
    {
        Task<IEnumerable<SecondHand>> GetAll();

        Task<IEnumerable<SecondHand>> FindAll(Func<SecondHand, bool> predicate);

        Task<IEnumerable<SecondHand>> GetSecondHandByPage(Func<SecondHand, bool> predicate, int page, int size);
    }
}
