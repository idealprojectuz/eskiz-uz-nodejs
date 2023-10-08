const axios = require("axios");
const fs = require("fs");
const path = require("path");
class Sms {
  #login;
  #password;
  #webhookurl;
  constructor(config) {
    this.#login = config.login;
    this.#password = config.password;
    this.#webhookurl = config.webhookurl;
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
  async send({ phone, message }) {
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
          mobile_phone: phone,
          message: message,
          from: 4546,
          callback_url: this.#webhookurl,
        },
      };
      const response = await axios(config);
      return await response.data;
      // throw new Error("hello");
    } catch (error) {
      // console.log(error.message);
      if (error.response.status === 401 || error.response.status === 403) {
        await this.auth();
        await this.send({ phone, message });
        return;
      }
      return {
        error: true,
        message: error.response.data.message,
        status: error.response.status,
      };
    }
  }
  async sendMultiple(arr, dispatch_id) {
    try {
      const data = JSON.parse(
        fs.readFileSync(path.join(__dirname, "token.json"))
      );

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://notify.eskiz.uz/api/message/sms/send-batch",
        headers: {
          Authorization: `Bearer ${data.data.token}`,
          "content-type": "application/json; charset=utf-8",
        },
        data: JSON.stringify({
          messages: arr,
          from: 4546,
          dispatch_id: dispatch_id,
        }),
      };
      const response = await axios(config);
      return response.data;
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 403) {
        await this.auth();
        await this.sendMultiple(arr, dispatch_id);
        return;
      }
      return {
        error: true,
        message: error.response.data.message,
        status: error.response.status,
      };
    }
  }
}
module.exports = Sms;
