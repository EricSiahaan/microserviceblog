const nodemailer = require('nodemailer');

exports.sendEmail = dataEmail => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: "eric.arthamas@gmail.com",
            pass: "zhrxrrzkdanoxldv",
        },
    });
    return (
        transporter.sendMail(dataEmail)
            .then(info =>
                console.log(`Email Terkirim : ${info.messageId}`)
            )
            .catch(err =>
                console.log(`Terjadi Kesalahan : ${err}`)
            )
    )
}