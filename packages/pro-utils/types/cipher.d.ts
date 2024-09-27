declare class AesEncryption {
    private key;
    private iv;
    constructor(opt?: Partial<EncryptionParams>);
    private getOptions;
    /** 加密文本 */
    encryptByAES(cipherText: string): string;
    /** 解密文本 */
    decryptByAES(cipherText: string): string;
}

/** 创建加密类 */
export declare function createAesEncryption(opt: Partial<EncryptionParams>): AesEncryption;

export declare function decryptByBase64(cipherText: string): string;

export declare function encryptByBase64(cipherText: string): string;

export declare function encryptByMd5(password: string): string;

export declare interface EncryptionParams {
    key: string;
    iv: string;
}

export { }
