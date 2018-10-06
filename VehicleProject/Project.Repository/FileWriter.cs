using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Project.Repository.Common;

namespace Project.Repository
{
    public class FileWriter: IFileWriter
    {
      
        public async Task<bool> WriteOrderToFile(string text)
        {
            
                if (!string.IsNullOrEmpty(text))
                {
                    string folderName = "OrderDetails";
                    string RootPath = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
                    string textFile = "Orders.txt";
                    string newPath = Path.Combine(RootPath, folderName);
                    string fullPath = Path.Combine(newPath, textFile);
                    if (!Directory.Exists(newPath))
                    {
                        Directory.CreateDirectory(newPath);
                        if (!File.Exists(textFile))
                        {
                            File.Create(fullPath);
                        }
                    }

                    using (var stream = new StreamWriter(fullPath, true))
                    {
                        await stream.WriteAsync(text);
                        return true;
                    }
                }
            
                throw new ArgumentException("Something Bad Happen");
            
        }
    }
}
