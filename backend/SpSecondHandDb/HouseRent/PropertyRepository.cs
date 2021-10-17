using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities.HouseRent;
using SpSecondHandDb.Repositories;

namespace SpSecondHandDb.HouseRent
{
    public class PropertyRepository : BaseRepository<Property>, IPropertyRepository
    {
        public PropertyRepository(SpShDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Property>> GetAll()
        {
            return await Task.FromResult(Context.Properties);
        }

        public async Task<IEnumerable<Property>> FindAll(Func<Property, bool> predicate, int page, int size)
        {
            var properties = Context.Properties
                .Include(s => s.User)
                .Include(s => s.City)
                .Where(predicate)
                .OrderByDescending(s => s.PublishTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(properties);
        }

        public async Task<IEnumerable<Property>> FindAllWithSorting(Func<Property, bool> predicate, Func<Property, dynamic> orderBy, bool isDesc, int page, int size)
        {
            var properties = isDesc
                ? Context.Properties.Include(s => s.User)
                    .Include(s => s.City).Where(predicate)
                    .OrderByDescending(orderBy).Skip(page * size).Take(size).ToList()
                : Context.Properties.Include(s => s.User)
                    .Include(s => s.City).Where(predicate)
                    .Where(predicate).OrderBy(orderBy).Skip(page * size).Take(size).ToList();

            return await Task.FromResult(properties);
        }

        public async Task<IEnumerable<Property>> GetPropertyByPage(int page, int size)
        {
            var properties = Context.Properties
                .OrderByDescending(o => o.PublishTime)
                .Skip(page * size)
                .Take(size)
                .ToList();

            return await Task.FromResult(properties);
        }
    }
}
