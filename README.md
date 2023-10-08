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

bir nechta odamga xabar yuborish xususiyati qo'shildi 
yani endi siz 
<code>
  let arr = [
    {
      user_sms_id: 1,
      to: 998901234567,
      text: "this is test message"
    },
    ...YOURDATA
  ]
  const sms = new Sms("test@eskiz.uz", "eskizpassword", 'webhookurl');
  const smsresponse = await sms.sendMultiple(arr, promotionId)
  //promotionid ga istalgan son yozish mumkin bazaga row ni id sini yozish ni tafsiya qilaman tafsiya etiladi transaction dan foydalanish shunda xato bo'lsa bazaga yozmay ketiladi 
    //xatoni qaytarishda express da shunday qilgan edim siz o'zingiz qaytarishingiz mumkin hohlaganingizdek bu yerda fetchMy bazaga query yozish uchun mo'ljallangan funksiya edi 
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



  
