const exchangeModel = require("../db/Models/exchange.Model")

let products = []
    // const currencyTab = {
    //     USD: {
    //         symbol: '$',
    //         price_in_naira: 460
    //     },
    //     GBP: {
    //         symbol: '£',
    //         price_in_naira: 560
    //     },
    //     NGN: {
    //         symbol: '₦',
    //         price_in_naira: 1
    //     },
    //     EUR: {
    //         symbol: '€',
    //         price_in_naira: 500
    //     }
    // }

let template = (data) => `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="https://aremumahmud.github.io/e-commerce-ui/email.css">
    <link rel="stylesheet" href="https://aremumahmud.github.io/e-commerce-ui/src/css/footer.css">
    <style>
    td,
    th {
        border: 1px solid black;
        column-span: 100px;
        padding: 60px;
        padding-bottom: 10px;
        padding-top: 10px;
    }
    body{
        padding:10px
    }
</style>
    </head>

<body>
<div class="container">
<a href='https://e-commerce-ui-ruddy.vercel.app/home' class="logo">
<img src="https://res.cloudinary.com/dvauarkh6/image/upload/v1686347400/DEV/vnfp8ucivmcfyyr8uipo.jpg" alt="" />
</a>
<div>
    <img class="img" src="https://res.cloudinary.com/dvauarkh6/image/upload/v1686142418/DEV/sbog3ukjm1prpggzajv7.svg" alt="">
</div>
<br>
<div >
<p>Hi ${data.first_name}</p><br>
<p>You have successfully placed an order at Glitzabelle Label! We are pleased let you know we are already working on shipping your order to your location.
</p>
</div>
<br>
<div class="topic2"><br>
<p>In the meantime here's a reminder of what you ordered</p>
<!-- <p>Here is/are your orders list</p> -->
</div>
<h3>[Order #${data.orderId}] (${new Date(data.createdAt).toString().split(' ').filter((x,i)=> i<4).join(' ')})</h3>
<br>
<table>
<tbody>
<tr>
    <th>Product name</th>
    <th>size</th>
    <th>Quantity</th>
    <th>Price</th>
</tr>

`

let end = data => `
<tr>
    <th colspan='3'>Subtotal</th>
    
    <th>${data.currency + String(data.total)}</th>
</tr>
<tr>
    <th colspan='3'>Payment Method</th>
    
    <th>${data.payment_method.split('_').join(' ')}</th>
</tr>
</tbody>
</table>
<br />
<div class="topic2">
    <p>Here are your orders details</p>
    <br />
</div>
<table style="font-size:12px">
<tbody>
<tr>
  <td>City:</td>
  <td>${data.city}</td>
  
</tr>
<tr>
  <td>Zip Code:</td>
  <td>${data.zip_code}</td>
</tr>
<tr>
  <td>First Name:</td>
  <td>${data.first_name}</td>
</tr>
<tr>
  <td>Last Name:</td>
  <td>${data.last_name}</td>
</tr>
<tr>
  <td>Email Address:</td>
  <td>${data.email_address}</td>
</tr>
<tr>
  <td>Phone Number:</td>
  <td>${data.phone_number}</td>
</tr>
<tr>
  <td>ShippingAddress:</td>
  <td>${data.address}</td>
</tr>
</tbody>

</table>
<footer>
            <hr />
           
            <div className="links">
                <ul style='display:flex;flex-direction:row;flex-wrap:wrap;margin:0;color:black'>
                    <li><a href="https://www.instagram.com/glitzabellelogistics/" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M512 306.9c-113.5 0-205.1 91.6-205.1 205.1S398.5 717.1 512 717.1 717.1 625.5 717.1 512 625.5 306.9 512 306.9zm0 338.4c-73.4 0-133.3-59.9-133.3-133.3S438.6 378.7 512 378.7 645.3 438.6 645.3 512 585.4 645.3 512 645.3zm213.5-394.6c-26.5 0-47.9 21.4-47.9 47.9s21.4 47.9 47.9 47.9 47.9-21.3 47.9-47.9a47.84 47.84 0 0 0-47.9-47.9zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zm-88 235.8c-7.3 18.2-16.1 31.8-30.2 45.8-14.1 14.1-27.6 22.9-45.8 30.2C695.2 844.7 570.3 840 512 840c-58.3 0-183.3 4.7-235.9-16.1-18.2-7.3-31.8-16.1-45.8-30.2-14.1-14.1-22.9-27.6-30.2-45.8C179.3 695.2 184 570.3 184 512c0-58.3-4.7-183.3 16.1-235.9 7.3-18.2 16.1-31.8 30.2-45.8s27.6-22.9 45.8-30.2C328.7 179.3 453.7 184 512 184s183.3-4.7 235.9 16.1c18.2 7.3 31.8 16.1 45.8 30.2 14.1 14.1 22.9 27.6 30.2 45.8C844.7 328.7 840 453.7 840 512c0 58.3 4.7 183.2-16.2 235.8z"></path></svg></a></li>
                    <li><a href="https://twitter.com/glitzlogistics" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4a170.1 170.1 0 0 0 75-94 336.64 336.64 0 0 1-108.2 41.2A170.1 170.1 0 0 0 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5a169.32 169.32 0 0 0-23.2 86.1c0 59.2 30.1 111.4 76 142.1a172 172 0 0 1-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4a180.6 180.6 0 0 1-44.9 5.8c-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path></svg></a></li>
                    <li><a href="https://www.facebook.com/Glitzabelleworld" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-32 736H663.9V602.2h104l15.6-120.7H663.9v-77.1c0-35 9.7-58.8 59.8-58.8h63.9v-108c-11.1-1.5-49-4.8-93.2-4.8-92.2 0-155.3 56.3-155.3 159.6v89H434.9v120.7h104.3V848H176V176h672v672z"></path></svg></a></li>
                    <li><a href="https://www.linkedin.com/in/bashirah-olawuyi-67778a1aa/" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M847.7 112H176.3c-35.5 0-64.3 28.8-64.3 64.3v671.4c0 35.5 28.8 64.3 64.3 64.3h671.4c35.5 0 64.3-28.8 64.3-64.3V176.3c0-35.5-28.8-64.3-64.3-64.3zm0 736c-447.8-.1-671.7-.2-671.7-.3.1-447.8.2-671.7.3-671.7 447.8.1 671.7.2 671.7.3-.1 447.8-.2 671.7-.3 671.7zM230.6 411.9h118.7v381.8H230.6zm59.4-52.2c37.9 0 68.8-30.8 68.8-68.8a68.8 68.8 0 1 0-137.6 0c-.1 38 30.7 68.8 68.8 68.8zm252.3 245.1c0-49.8 9.5-98 71.2-98 60.8 0 61.7 56.9 61.7 101.2v185.7h118.6V584.3c0-102.8-22.2-181.9-142.3-181.9-57.7 0-96.4 31.7-112.3 61.7h-1.6v-52.2H423.7v381.8h118.6V604.8z"></path></svg></a></li>
                    <li><a href="https://api.whatsapp.com/send?phone=2348032403003" target="_blank"><svg stroke="currentColor" fill="currentColor" stroke-width="0" t="1569683925316" viewBox="0 0 1024 1024" version="1.1" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><defs></defs><path d="M713.5 599.9c-10.9-5.6-65.2-32.2-75.3-35.8-10.1-3.8-17.5-5.6-24.8 5.6-7.4 11.1-28.4 35.8-35 43.3-6.4 7.4-12.9 8.3-23.8 2.8-64.8-32.4-107.3-57.8-150-131.1-11.3-19.5 11.3-18.1 32.4-60.2 3.6-7.4 1.8-13.7-1-19.3-2.8-5.6-24.8-59.8-34-81.9-8.9-21.5-18.1-18.5-24.8-18.9-6.4-0.4-13.7-0.4-21.1-0.4-7.4 0-19.3 2.8-29.4 13.7-10.1 11.1-38.6 37.8-38.6 92s39.5 106.7 44.9 114.1c5.6 7.4 77.7 118.6 188.4 166.5 70 30.2 97.4 32.8 132.4 27.6 21.3-3.2 65.2-26.6 74.3-52.5 9.1-25.8 9.1-47.9 6.4-52.5-2.7-4.9-10.1-7.7-21-13z"></path><path d="M925.2 338.4c-22.6-53.7-55-101.9-96.3-143.3-41.3-41.3-89.5-73.8-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6 0.3-119.3 12.3-174.5 35.9-53.3 22.8-101.1 55.2-142 96.5-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9 0.3 69.4 16.9 138.3 48 199.9v152c0 25.4 20.6 46 46 46h152.1c61.6 31.1 130.5 47.7 199.9 48h2.1c59.9 0 118-11.6 172.7-34.3 53.5-22.3 101.6-54.3 142.8-95.2 41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5 0.3-60.9-11.5-120-34.8-175.6z m-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-0.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-0.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-0.6 99.6-39.7 192.9-110.1 262.7z"></path></svg></a></li>
                    <li> <a href="mailto:glitzabelleworld@gmail.com"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg></a></li>
                </ul>
            </div>
            <div className="other">
                <div className="copyWright">
                    <p>&copy; 2023 Glitzabelle Label. All rights reserved</p>
                </div>
            </div>
        </footer>
</div>
</body>

</html>`

let product = (x, data, currencyTab) => `
<tr>
    <td>${x.parent_product}</td>
    <td>${x.size || '55'}</td>
    <td>${x.quantity}</td>
    <td>${data.currency +  String(+(x.price/currencyTab[data.currency].price_in_naira).toFixed(2))}</td>
</tr>

`

require('../db/conn')

function generate(points) {
    return new Promise((resolve, reject) => {
        exchangeModel.findOne().then(doc => {
            let currencyTab = {
                USD: {
                    symbol: "$",
                    price_in_naira: doc.USD,
                },
                GBP: {
                    symbol: "£",
                    price_in_naira: doc.GBP,
                },
                NGN: {
                    symbol: "₦",
                    price_in_naira: doc.NGN,
                },
                EUR: {
                    symbol: "€",
                    price_in_naira: doc.EUR,
                },
            }
            let prods = points.products.map(x => product(x, points, currencyTab)).join('')
            let template_final = template(points) + prods + end(points)
            return resolve(template_final)

        })
    })

    // return

}


//require('fs').writeFileSync('./hh.html', generate(j))
module.exports = generate
