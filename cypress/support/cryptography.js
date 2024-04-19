import * as key from "../fixtures/TS_001_Register.json";

var CryptoJS = require("crypto-js");

export class Cryptography {
  static Secret = key.encryptionKey.AES;
  static decrypt(text) {
    var bytes = CryptoJS.AES.decrypt(text, this.Secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  static encrypt(text) {
    return CryptoJS.AES.encrypt(text, this.Secret).toString();
  }
}

