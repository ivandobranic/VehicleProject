using Project.Repository.Common;
using Project.Service.Common;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service
{
    public class FileWriterService : IFileWriterService
    {
        IFileWriter FileWriter;
        public FileWriterService(IFileWriter fileWriter)
        {
            this.FileWriter = fileWriter;
        }

        public async Task<bool> WriteOrderToFileAsync(string text)
        {
            return await FileWriter.WriteOrderToFile(text);
        }
    }
}
