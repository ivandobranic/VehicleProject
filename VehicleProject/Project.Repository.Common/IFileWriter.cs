using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.Repository.Common
{
    public interface IFileWriter
    {
        Task<bool> WriteOrderToFile(string text);
    }
}
