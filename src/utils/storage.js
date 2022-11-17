import { Env } from "../config/env";
import JSEncrypt from "jsencrypt";
const storage = {
  // 设置缓存
  localSet: function (name, data) {
    localStorage.removeItem(name);
    if (name === "record") {
      data.password = encrypt(data.password);
      localStorage.setItem(name, JSON.stringify(data));
    } else {
      localStorage.setItem(name, JSON.stringify(data));
    }
  },
  // 获取缓存
  localGet: function (name) {
    let data = JSON.parse(localStorage.getItem(name));
    if (name === "record" && data) {
      data.password = decrypt(data.password);
    }
    return data;
  },
  // 清除缓存
  localRemove: function (name) {
    localStorage.removeItem(name);
  },
  sessionSet: function (name, data) {
    sessionStorage.removeItem(name);
    sessionStorage.setItem(name, JSON.stringify(data));
  },
  sessionGet: function (name) {
    return JSON.parse(sessionStorage.getItem(name));
  },
  sessionRemove: function (name) {
    sessionStorage.removeItem(name);
  },
};
// 公钥加密
function encrypt(text) {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(Env.PUB_KEY);
  const encrypted = encrypt.encrypt(text);
  return encrypted;
}

// 私钥解密
function decrypt(text) {
  const decrypt = new JSEncrypt();
  decrypt.setPrivateKey(Env.PRIV_KEY);
  const decrypted = decrypt.decrypt(text);
  return decrypted;
}
export default storage;
