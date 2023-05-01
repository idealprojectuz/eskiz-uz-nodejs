import fs from "fs";
import fetch from "node-fetch";
import { FormData } from "node-fetch";

class Sms {
  #login;
  #password;
  constructor ( login, password ) { 
    this.#login = login
    this.#password=password
  }
  async auth() {
    const formdata = new FormData();
    formdata.append('email', this.#login)
    formdata.append('password', this.#password)
    const option = {
      method: "POST",
      body: formdata
    }
    const response = await fetch( "https://notify.eskiz.uz/api/auth/login", option );
    const data = await response.json();
    fs.promises.writeFile('./utils/token.json', JSON.stringify(data, null, 4) )
  }
  async send( phonenumber, message ) {
        const data = await JSON.parse(await fs.promises.readFile("./utils/token.json", "utf-8"));
    const sendingdata = new FormData()  
    sendingdata.append( "mobile_phone", phonenumber );
    sendingdata.append( "message", message );
    sendingdata.append("from", 4546);
    const option = {
        method: "POST",
        redirect: "follow",
        headers: {
          Authorization: "Bearer " + data.data.token,
        },
        body: sendingdata,
    };
    const response = await fetch( "http://notify.eskiz.uz/api/message/sms/send", option );
    const responsejson = await response;
    if ( responsejson.status == 200 ) {
      const data = response.json()
      return true
    }
    else {
      this.auth()
      const ndata = await JSON.parse(
                await fs.readFileSync("./utils/token.json", "utf-8")
      );
        const nsendingdata = new FormData();
        nsendingdata.append("mobile_phone", phonenumber);
        nsendingdata.append("message", message);
        nsendingdata.append("from", 4546);
        const newoption = {
          method: "POST",
          redirect: "follow",
          headers: {
            Authorization: "Bearer " + ndata.data.token,
          },
          body: nsendingdata,
        };
        const response = await fetch(
          "http://notify.eskiz.uz/api/message/sms/send",
          newoption
        );
      return true;
     }
  }
}
const sms = new Sms("Sizning eskiz loginingiz", "Sizning eskiz parolingiz");
sms.send('998901234567','salom dunyo')
