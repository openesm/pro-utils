import Axios from 'axios';
import { AxiosInstance } from 'axios';
import { AxiosRequestConfig } from 'axios';
import { AxiosResponse } from 'axios';
import { CancelTokenSource } from 'axios';
import { CancelTokenStatic } from 'axios';

export { Axios }

export declare function createHttp(options?: HttpConfig): Http;

export declare function getCancelTokenSource(): CancelTokenSource;

/**
 * 1. 支持全局配置 Loading、showError、delay、
 * 2. 支持并发请求，共用 loading 和 showError (待完成)
 * 3. 支持取消请求
 * 4. 支持拦截器
 * 5. 状态码处理
 */
export declare class Http {
    axios: AxiosInstance;
    private baseURL;
    private showLoading;
    private showError;
    private showErrorMode;
    private delay;
    private onShowLoading?;
    private onHideLoading?;
    private onShowError?;
    private timeout_text;
    private default_err;
    static create(options?: HttpConfig): Http;
    constructor(options?: HttpConfig);
    get CancelToken(): CancelTokenStatic;
    get(url: string, params?: Record<string, any>, config?: HttpRequestConfig): Promise<HttpResponseFail | HttpResponseOk<unknown>>;
    post(url: string, params?: Record<string, any>, config?: HttpRequestConfig): Promise<HttpResponseFail | HttpResponseOk<unknown>>;
    put(url: string, params?: Record<string, any>, config?: HttpRequestConfig): Promise<HttpResponseFail | HttpResponseOk<unknown>>;
    delete(url: string, params?: Record<string, any>, config?: HttpRequestConfig): Promise<HttpResponseFail | HttpResponseOk<unknown>>;
    upload(url: string, params?: Record<string, any>, config?: HttpRequestConfig): Promise<HttpResponseFail | HttpResponseOk<unknown>>;
    private request;
    private getLoadingConfig;
    private getUrl;
}

export declare interface HttpConfig extends AxiosRequestConfig, Partial<HttpLoadingConfig> {
    onShowLoading?: () => void;
    onHideLoading?: () => void;
    onShowError?: (msg: string, config: HttpLoadingConfig) => void;
    timeout_text?: string;
    default_err?: string;
    validStatusCode?: (status: number, res: AxiosResponse<any, any>) => string | void;
}

export declare interface HttpLoadingConfig {
    showLoading: boolean;
    showError: boolean;
    showErrorMode: string;
    delay: number;
}

export declare type HttpRequestConfig = Omit<AxiosRequestConfig, 'baseURL'> & Partial<Omit<HttpLoadingConfig, 'delay'>> & {
    delay?: number | boolean;
};

declare type HttpResponseBase = {
    server_date?: string;
    server_time?: number;
};

declare type HttpResponseFail = {
    ok: false;
    err: string;
} & HttpResponseBase;

declare type HttpResponseOk<T = unknown> = {
    ok: true;
    data: T;
} & HttpResponseBase;

export { }
