var nodemailer = require('nodemailer');
const html = (email) => `

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
        <a href='https://e-commerce-ui-ruddy.vercel.app/home' class="logo">
            <img src="https://res.cloudinary.com/dvauarkh6/image/upload/v1686347400/DEV/vnfp8ucivmcfyyr8uipo.jpg" alt="" />
        </a>
        <div>
            <img class="img" src="https://res.cloudinary.com/dvauarkh6/image/upload/v1686174910/DEV/qx7bwn5aqo3tqmuulfut.png" alt="">
        </div>
        <br>
        <div class="topic">
            <h2> Welcome to Glitzabelle Label's Mailing List!</h2>
        </div>
        <br>
        <div>
            <p> Dear ${email},</p>
            <br>
            <p style="font-size: small;">Congratulations! You have successfully joined Glitzabelle Label's mailing list. We are thrilled to have you on board. As a valued subscriber, you will now receive exclusive updates, promotions, and insider news directly to your inbox. Be the
                first to discover our latest products, fashion trends, and exciting events! Rest assured, your privacy is of utmost importance to us. We will never share your personal information with any third parties. Our emails are carefully crafted
                to bring you relevant and engaging content tailored to your interests. To manage your subscription preferences or unsubscribe at any time, simply click on the corresponding links located at the bottom of our emails. <br><br> Stay connected
                with us on social media for even more Glitzabelle Label goodness:
            </p><br>
            <ul style="list-style-type: none;padding-left: 0 !important;">
                <li><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path></svg>
                    <a href="https://www.instagram.com/glitzabellelogistics/">Instagram:</a>
                </li>
                <li><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"></path></svg>
                    <a href="https://www.facebook.com/Glitzabelleworld">Facebook: </a>
                </li>

                <li><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path></svg>
                    <a href="https://twitter.com/glitzlogistics">Twitter:</a>
                </li>
            </ul>
            <br>
            <p style="font-size: small;">If you have any questions or need assistance, our dedicated support team is here to help. Reach out to us at
                <a href="mailto:glitzabelleworld@gmail.com">glitzabelleworld@gmail.com</a>, and we'll be more than happy to assist you. Once again, welcome to Glitzabelle Label's mailing list! Get ready to be inspired and stay ahead of the fashion game.
            </p><br>
            <p style="font-weight: bold;">Best regards, </p>
            <p style="font-weight: bold;">Mahmud Aremu </p>
            <p style="font-weight: bold;">The Dev team</p>
            <a style="font-weight: bold;" href="e-commerce-ui-ruddy.vercel.app">Glitzabelle Label</a>

        </div>
    </div>
</body>

</html>`

function sendmail_suscribe(email) {
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
        subject: 'Suscription Notification From Glitzabelle Label!',

        html: html(email.split('@')[0])
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

module.exports = sendmail_suscribe

//sendmail('aremumahmud2003@gmail.com')