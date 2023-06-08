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

<code>
  module.export=Sms
</code>

sms yuborish uchun quyidagi buyruqni bajaring 

eskiz uz dan shartnoma qilsangiz quyidagi email va kodlarni olasiz 

parolni dashboardga kirganingizda 


<code>
  const sms = new Sms("test@eskiz.uz", "eskizpassword");
  sms.send("998901234567", "Hello Developer");
</code>


  
