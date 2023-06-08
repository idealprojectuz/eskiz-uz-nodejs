const axios = require("axios");
const fs = require("fs");
const path = require("path");
class Sms {
  #login;
  #password;
  constructor(login, password) {
    this.#login = login;
    this.#password = password;
  }
  async auth() {
    try {
      const response = await axios.post(
        "https://notify.eskiz.uz/api/auth/login",
        {
          email: this.#login,
          password: this.#password,
        }
      );
      const data = await response.data;
      fs.writeFileSync(
        path.join(__dirname, "token.json"),
        JSON.stringify(data, null, 2)
      );
    } catch (error) {
      console.log(error.message);
    }
  }
  async send(phonenumber, message) {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "token.json"))
      );
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://notify.eskiz.uz/api/message/sms/send",
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
        data: {
          mobile_phone: phonenumber,
          message: message,
          from: 4546,
        },
      };
      const request = await axios(config);
      return await request.data;
    } catch (error) {
      await this.auth();
      const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "token.json"))
      );
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://notify.eskiz.uz/api/message/sms/send",
        headers: {
          Authorization: `Bearer ${data.data.token}`,
        },
        data: {
          mobile_phone: phonenumber,
          message: message,
          from: 4546,
        },
      };
      const request = await axios(config);
      return await request.data;
    }
  }
}
const sms = new Sms("test@eskiz.uz", "eskizpassword");

sms.send("998901234567", "Hello Developer");
