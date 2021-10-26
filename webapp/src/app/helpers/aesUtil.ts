import * as CryptoJS from 'crypto-js';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class AesUtil {
    keySize: number;
    iterationCount: number;
    passphraseText = 'tradebullapplication';

    aesUtil(keySize, iterationCount) {
        this.keySize = keySize / 32;
        this.iterationCount = iterationCount;
    }

    generateKey(salt, passPhrase) {
        return CryptoJS.PBKDF2(
            passPhrase,
            CryptoJS.enc.Hex.parse(salt),
            {keySize: this.keySize, iterations: this.iterationCount});
    }

    encrypt(salt, iv, passPhrase, plainText) {
        const key = this.generateKey(salt, passPhrase);
        const encrypted = CryptoJS.AES.encrypt(
            plainText,
            key,
            {iv: CryptoJS.enc.Hex.parse(iv)});
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    }

    decrypt(salt, iv, passPhrase, cipherText) {
        const key = this.generateKey(salt, passPhrase);
        const cipherParams = CryptoJS.lib.CipherParams.create({
            ciphertext: CryptoJS.enc.Base64.parse(cipherText)
        });
        const decrypted = CryptoJS.AES.decrypt(
            cipherParams,
            key,
            {iv: CryptoJS.enc.Hex.parse(iv)});
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    rotate(d) {
        const ans = this.passphraseText.substring(d) + this.passphraseText.substring(0, d);
        return ans;
    }
}
