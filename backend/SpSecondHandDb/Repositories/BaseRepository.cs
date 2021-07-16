using System.Threading.Tasks;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        public BaseRepository(SpShDbContext context)
        {
            Context = context;
        }

        public async Task<T> Get(int id)
        {
            return await Context.FindAsync<T>(id);
        }

        public virtual async Task<T> Add(T entityToAdd) 
        {
            await Context.AddAsync(entityToAdd);
            await Context.SaveChangesAsync();

            return entityToAdd;
        }

        public async Task<T> Update(T entityToUpdate)
        {
            Context.Update(entityToUpdate);
            await Context.SaveChangesAsync();

            return entityToUpdate;
        }

        public async Task Delete(T entityToDelete)
        {
            Context.Remove(entityToDelete);
            await Context.SaveChangesAsync();
        }

        #region private

        protected readonly SpShDbContext Context;

        #endregion
    }
}
