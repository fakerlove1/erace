/**
 * Created by WuZeHua 2020/01/12
 * data encrypt
 */
import JSEncrypt from 'jsencrypt';
import CryptoJS from "crypto-js";

/**
 * RSA encrypt
 * @param {String} data be encrypted
 * @param {String} pubKey public key
 */
function RSAEncrypt(data, pubKey) {
    var encryptor = new JSEncrypt();
    encryptor.setPublicKey(pubKey);
    return encryptor.encrypt(data);
}

/**
 * AES encrypt
 * @param {String} data 
 * @param {String} key 
 */
function AESEncrypt(data, KEY) {
    var data = data;
    var options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(KEY);
    var encryptedData = CryptoJS.AES.encrypt(data, key, options);
    var encryptedBase64Str = encryptedData.toString().replace(/\//g, "_");
    encryptedBase64Str = encryptedBase64Str.replace(/\+/g, "-");
    console.log("encryptedBase64Str: ", encryptedBase64Str);
    return encryptedBase64Str;
}

export { RSAEncrypt, AESEncrypt };