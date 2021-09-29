using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SpSecondHandDb.Entities;
using SpSecondHandDb.Interfaces;

namespace SpSecondHandDb.Repositories
{
    public class ChatRepository : BaseRepository<ChatHistory>, IChatRepository
    {
        private readonly SpShDbContext _context;

        public ChatRepository(SpShDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ChatHistory>> GetAll()
        {
            return await _context.ChatHistories.ToListAsync();
        }

        public async Task<ChatHistory> GetById(int id)
        {
            return await _context.ChatHistories.FindAsync(id);
        }

        public async Task<IEnumerable<ChatHistory>> FindAll(Func<ChatHistory, bool> condition)
        {
            var histories = _context.ChatHistories.Where(condition);
            return await Task.FromResult(histories);
        }

        public async Task<IEnumerable<ChatHistory>> FindByPage(Func<ChatHistory, bool> condition, int page, int size)
        {
            var histories = _context.ChatHistories.Where(condition)
                .OrderByDescending(c => c.Time)
                .Skip(page * size)
                .Take(size);
            return await Task.FromResult(histories);
        }

        public async Task UpdateAll(IEnumerable<ChatHistory> messagesToUpdate)
        {
            _context.UpdateRange(messagesToUpdate);
            await _context.SaveChangesAsync();
        }
    }
}
