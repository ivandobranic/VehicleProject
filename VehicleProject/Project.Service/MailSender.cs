using Project.Service.Common;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Project.Service
{
   public class MailSender : IMailSender
    {
        public bool SendOrderMail(string emailAdress, string text) 
        {
            if (!string.IsNullOrEmpty(emailAdress))
            {
                SmtpClient client = new SmtpClient("smtp.mail.yahoo.com");
                client.UseDefaultCredentials = false;
                client.Port = 587;
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential("vehicleproject@yahoo.com", "mono12345");

                MailMessage mailMessage = new MailMessage();
                mailMessage.From = new MailAddress("vehicleproject@yahoo.com");
                mailMessage.To.Add(emailAdress);
                mailMessage.Body = text;
                mailMessage.Subject = "Order Details";
                client.Send(mailMessage);
                return true;
            }
            throw new ArgumentException("Email entry is wrong");
        }
    }
}
