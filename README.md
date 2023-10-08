<h2> Eskiz.uz sms provayderi uchun yozilgan lib </h2>
Ushbu lib ishlashi uchun siz quyidagi Sms.js fayli turgan katalogda token.json nomli fayl ham ochishingiz kerak bo'ladi tokenni saqlab turishi uchun 

lib ishlashi uchun quyidagi kutibxonalar kerak bo'ladi 
npm orqali
<code> 
  npm i axios
</code>

yarn orqali
<code> 
  yarn add axios
</code>

boshqa fayllarda ham ishlatmoqchi bo'lsangiz 
Sms.js faylidagi 
Sms classini export qiling

<code>module.export=Sms</code>

sms yuborish uchun quyidagi buyruqni bajaring 
<code>
  const sms = new Sms("test@eskiz.uz", "eskizpassword", 'webhookurl');
  sms.send("998901234567", "Hello Developer");
</code>
eskiz uz dan shartnoma qilsangiz quyidagi email va kodlarni olasiz 

parolni dashboardga kirganingizda <br>
<img src="https://github.com/idealprojectuz/eskiz-uz-nodejs/blob/main/rasm.png?raw=true" width="500"> 
<br>


V2 
<div>
  <h3>Webhook nmaga ishlatilgan</h3>
  <p>Webhook bu yerda eskiz saytidan xabar yuborilgan yoki yuborilmaganligini qaytarib beradi
  buni uzingiz ko'rishingiz mumkin deploy qilmasdan ko'rish uchun tunnel servislardan foydalanishingiz mumkin
  webhook post so'rov yuboradi yani siz bergan manzilga post so'rov yuboradi 
    formdata ko'rinishida uni multer kutibxonasi bilan parse qilishingiz mumkin
  </p>
</div>

<h3>
bir nechta odamga xabar yuborish xususiyati qo'shildi 
yani endi siz 
  </h3>
<code>
  let arr = [
    {
      user_sms_id: 1,
      to: 998901234567,
      text: "this is test message"
    }
  ]
  const sms = new Sms("test@eskiz.uz", "eskizpassword", 'webhookurl');
  const smsresponse = await sms.sendMultiple(arr, promotionId)
</code>
<div>
<h3>
  promotionid ga istalgan son yozish mumkin bazaga row ni id sini yozish ni tafsiya qilaman tafsiya etiladi transaction dan foydalanish shunda xato bo'lsa bazaga yozmay ketiladi 
    xatoni qaytarishda express da shunday qilgan edim siz o'zingiz qaytarishingiz mumkin hohlaganingizdek bu yerda fetchMy bazaga query yozish uchun mo'ljallangan funksiya edi 
  </h3>
  </div>
  <div>
    <code>
   if (smsresponse?.error) {
    await fetchMy("ROLLBACK");
    res.status(smsresponse.status).json({
      ok: false,
      message: smsresponse.message,
      status: smsresponse.status,
    });
    return;
  }
  </code>
  </div>




  
