using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SpSecondHandDb.Entities.HouseRent;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.HouseRent
{
    public interface IPropertyRepository : IBaseRepository<Property>
    {
        Task<IEnumerable<Property>> GetAll();

        Task<IEnumerable<Property>> FindAll(Func<Property, bool> predicate, int page, int size);

        Task<IEnumerable<Property>> FindAllWithSorting(Func<Property, bool> predicate, Func<Property, dynamic> orderBy,
            bool isDesc, int page, int size);

        Task<IEnumerable<Property>> GetPropertyByPage(int page, int size);
    }
}
