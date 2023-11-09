
const nodemailer = require("nodemailer");
const mailTemplate = require("./templates");
const config = require('./../config').mail;
const transporter = nodemailer.createTransport({        //Faz a conexão com o smtp para o envio de emails
    service: 'gmail',
    host: config.mailHost,
    secure: true,
    auth: {
      user: config.mailUser,
      pass: config.mailPassword,
    },
    tls: {
        rejectUnauthorized: false,
    }
  });

  module.exports.sendMail = async (dest, subject, content, template) => {    
    if(content && dest && template && subject){
        const info = await transporter.sendMail({           
            from: config.mailSenderName,        
            to: dest,                           
            subject,                            
            html: fillTemplate(template,content)    
          });
        
        return info.accepted  
    }
}

const fillTemplate = (template, content) => {
    let html = mailTemplate.getTemplate(template);
    for(let k in content){
        html = html.replace(`{${k}}`, content[k])
    }
    return html;
}