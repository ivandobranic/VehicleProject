using Project.Repository.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Repository
{
    public class Filter : IFilter
    {
        
        public int PageNumber { get; set; }
        public int PageSize { get; } = 3;
        public bool IsAscending { get; set; }
        public string Search { get; set; }
        public int TotalCount { get; set; }
    }
}
