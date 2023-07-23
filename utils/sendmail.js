var nodemailer = require('nodemailer');
const generate = require('./generate_temp_email');

function sendmail(email, data, discount) {
    generate(data, discount).then(resp => {
        var transporter = nodemailer.createTransport({
            //host: 'smtp-relay.sendinblue.com',
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.SMTP_USER || 'glitzabellelabel@zohomail.com',
                pass: process.env.SMTP_PASSWORD || 'R9wJ9M8Z4uDr'
            }
        });
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Server is ready to take messages');
            }
        });
        var mailOptions = {
            from: 'glitzabellelabel@zohomail.com',
            to: [email, 'glitzabellelabel@gmail.com'],
            subject: 'Order Notification From Glitzabelle Label!',

            html: resp
                //    `

            //  <div style='width:100%'>
            //  <h4 style='text-align:center'>welcome to our wonderful investment platform. <br>Sign in with the button below to get started </h4><br>
            // <a style='text-align:center;padding:10px;border-radius:10px' href='http://cryptocoinsmart.crypsc.repl.co/pages/login'> Sign in</a> </div>
            //  `
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    })

}

module.exports = sendmail

//sendmail('aremumahmud2003@gmail.com')