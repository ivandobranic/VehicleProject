using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service.Common
{
    public interface IFileWriterService
    {
        Task<bool> WriteOrderToFileAsync(string text);
    }
}
