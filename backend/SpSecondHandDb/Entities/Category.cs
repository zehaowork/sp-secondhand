﻿namespace SpSecondHandDb.Entities
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LogoUrl { get; set; }
        public int? Order { get; set; }
    }
}
