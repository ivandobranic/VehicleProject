using System;
using System.Collections.Generic;
using System.Text;

namespace Project.Service.Common
{
    public interface IMailSender
    {
        bool SendOrderMail(string emailAdress, string text);
    }
}
