let $ = (e)=> document.getElementById(e)

$('sendMail').onclick = ()=>{
    let id  = $('orderId').value
    fetch('/v1/api/send_delivery_email?id='+ id).then(res=>{
        return res.json()
    }).then(res=>{
        alert('sent delivery email successfully')
    }).catch(err=>{
        alert('sorry an unexpected error occured!')
    })

}