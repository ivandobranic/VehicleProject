using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Repository.Common
{
    public interface IFilter
    {
        int PageNumber { get; set; }
        int PageSize { get; }
        bool IsAscending { get; set; }
        string Search { get; set; }
        int TotalCount { get; set; }
    }
}
