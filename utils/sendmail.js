var nodemailer = require('nodemailer');
const html = (id, host) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://aremumahmud.github.io/e-commerce-ui/email.css">
    <link rel="stylesheet" href="https://aremumahmud.github.io/e-commerce-ui/src/css/footer.css">
</head>

<body>
<div class="container">
<div class="logo">
    <h1>Glitz<span>abellelabel Stores</span></h1>
</div>
<div>
    <img class="img" src="https://res.cloudinary.com/dvauarkh6/image/upload/v1686174910/DEV/qx7bwn5aqo3tqmuulfut.png" alt="">
</div>
<br>
<div class="topic">
    <h2>You have sucessfuly placed an order at Glitzabelle stores!</h2>
</div>
<br>
<div>
<p style> check your order details here at : <a href="${host + id}">order details</a></p>
</div>
</div>
</body>

</html>`

function sendmail(email, id, host) {
    var transporter = nodemailer.createTransport({
        //host: 'smtp-relay.sendinblue.com',
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'glitzabellelabel@zohomail.com',
            pass: 'R9wJ9M8Z4uDr'
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
        to: email,
        subject: 'Welcome email from CryptoCoinSmart !',

        html: html(id, host)
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
}

module.exports = sendmail

//sendmail('aremumahmud2003@gmail.com')