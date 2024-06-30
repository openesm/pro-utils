import { encrypt, decrypt } from 'crypto-js/aes'
import UTF8, { parse      } from 'crypto-js/enc-utf8'
import pkcs7                from 'crypto-js/pad-pkcs7'
import ECB                  from 'crypto-js/mode-ecb'
import md5                  from 'crypto-js/md5'
import Base64               from 'crypto-js/enc-base64'

export interface EncryptionParams {
    key: string
    iv : string
}

class AesEncryption {
    private key
    private iv

    constructor(opt: Partial<EncryptionParams> = {}) {
        const { key, iv } = opt
        if (key) this.key = parse(key)
        if (iv ) this.iv  = parse(iv)
    }

    private getOptions() {
        return {
            mode   : ECB,
            padding: pkcs7,
            iv     : this.iv,
        }
    }

    /** 加密文本 */
    encryptByAES(cipherText: string) {
        return encrypt(cipherText, this.key as any, this.getOptions()).toString()
    }

    /** 解密文本 */
    decryptByAES(cipherText: string) {
        return decrypt(cipherText, this.key as any, this.getOptions()).toString(UTF8)
    }
}

/** 创建加密类 */
export function createAesEncryption(opt: Partial<EncryptionParams>) {
    return new AesEncryption(opt)
}

export function encryptByBase64(cipherText: string) {
    return Base64.parse(cipherText).toString(UTF8)
}

export function decryptByBase64(cipherText: string) {
    return Base64.parse(cipherText).toString(UTF8)
}

export function encryptByMd5(password: string) {
    return md5(password).toString()
}
