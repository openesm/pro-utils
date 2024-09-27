export declare function addClass(el: Element, cls: string): void;

export declare function copyText(input: string, { target }?: any): boolean;

/** 创建缓存 */
export declare function CreateStorage(opt: Partial<StorageCacheConstructorOptions>): StorageCache;

/**
 * DataURL 基本原理
 * https://www.cnblogs.com/tianma3798/p/13582175.html
 *
 * Blob 你知道多少 （Blob 类型的对象表示不可变的类似文件对象的原始数据）
 * https://zhuanlan.zhihu.com/p/500199997
 *
 * atob: 解码 base64 字符串
 * btoa: 编码 base64
 * https://www.runoob.com/jsref/met-win-atob.html
 *
 * Uint8Array:  数组类型表示一个 8 位无符号整型数组，创建时内容被初始化为 0。
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
 */
/**
 * base64 图片转换成 Blob
 *
 * eg:
 * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0e....
 */
export declare function dataURLToBlob(base64Buffer: string): Blob;

/** 基于 base64 下载图片 */
export declare function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart): void;

/** 根据文件流下载 */
export declare function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart): void;

/** 基于在线 URL 下载图片 */
export declare function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart): void;

/** 根据文件地址打开新窗口下载 */
export declare function downloadByUrl({ url, target, fileName, }: {
    url: string;
    target?: '_self' | '_blank';
    fileName?: string;
}): boolean;

/** 获取域名 */
export declare const getHost: () => string;

/** 获取 websocket 域名 */
export declare function getWsHost(): string;

/** 兼容样式 */
export declare function hackCss(attr: string, value: string): any;

export declare function hasClass(el: Element, cls: string): boolean;

/** 加载远程图片 */
export declare function loadImage(url: string): Promise<HTMLImageElement | null>;

/**
 * 打开新窗口
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open
 */
export declare function openWindow(url: string, opt?: {
    target?: '_self' | '_blank' | string;
    noopener?: boolean;
    noreferrer?: boolean;
}): void;

/** 解析URL, search 参数转 map */
export declare const parseLocationSearch: () => Record<string, string> | undefined;

export declare function removeClass(el: Element, cls: string): void;

/** 缓存类 */
declare class StorageCache {
    private storage;
    private prefixKey;
    private timeout;
    constructor(opt: Partial<StorageCacheConstructorOptions>);
    /** 转换为大写字母 KEY */
    private getKey;
    set(key: string, value: any, expire?: number): boolean;
    get<T>(key: string): T | null;
    remove(key: string): void;
    /** 获取指定前缀的 keys */
    getKeys(): string[];
    /** 清空缓存 */
    clear(): void;
    /** 清除过期缓存 */
    cleanUp(): void;
}

export declare interface StorageCacheConstructorOptions {
    storage: Storage;
    prefixKey: string | (() => string);
    timeout: number;
}

/** 图片路径转换成 Base64 */
export declare function urlToBase64(url: string, mime?: string): Promise<string>;

export { }
