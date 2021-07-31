using SpSecondHandDb.Entities;

namespace SpSecondHandModels
{
    public class ItemDto
    {
        public ItemDto(Items item)
        {
            Id = item.Id;
            Name = item.Name;
            ImgUrl = item.ImgUrl;
            Sort = item.Sort;
            ProjectId = item.ProjectId;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        public int? Sort { get; set; }
        public int? ProjectId { get; set; }
    }
}
