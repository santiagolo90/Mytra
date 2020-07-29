const nodemailer = require('nodemailer');
const parametros = require('../config/parametros')

module.exports.sendMail = async (subject, message) => {

  const msj = await sentToMailer(subject, message)
  return msj;

}


async function sentToMailer(subject, message) {
  const mailTransport = nodemailer.createTransport({
    service: parametros.EMAIL_CONFIG.SERVICE,
    auth: {
      user: parametros.EMAIL_CONFIG.USER,
      pass: parametros.EMAIL_CONFIG.PASS
    }
  });

  const mailOptions = {
    to: parametros.EMAIL_CONFIG.TO,
    from: parametros.EMAIL_CONFIG.USER,
    subject: subject,
    html: message
  };

  return new Promise((resolve, reject) => {
    try {

      let msj = mailTransport.sendMail(mailOptions);
      return resolve(msj);

    } catch (error) {
      return reject(error);
    }
  });
}



