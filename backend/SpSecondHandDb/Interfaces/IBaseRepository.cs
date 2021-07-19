using System.Threading.Tasks;

namespace SpSecondHandDb.Interfaces
{
    public interface IBaseRepository<T> where T : class 
    {
        Task<T> Get(int id);

        Task<T> Add(T entityToAdd);

        Task<T> Update(T entityToUpdate);

        Task Delete(T entityToDelete);
    }
}
