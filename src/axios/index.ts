import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import Axios from 'axios'

// 请求 Loading 相关配置
export interface HttpLoadingConfig {
    showLoading  : boolean
    showError    : boolean
    showErrorMode: string
    delay        : number
}

// 单个请求配置
export type HttpRequestConfig = Omit<AxiosRequestConfig, 'baseURL'> & Partial<Omit<HttpLoadingConfig, 'delay'>> & {
    delay?: number | boolean
}

// 实例配置
export interface HttpConfig extends AxiosRequestConfig, Partial<HttpLoadingConfig> {
    onShowLoading  ?: () => void
    onHideLoading  ?: () => void
    onShowError    ?: (msg: string, config: HttpLoadingConfig) => void
    timeout_text   ?: string
    default_err    ?: string
    validStatusCode?: (status: number, res: AxiosResponse<any, any>) => string | void

    // requestInterceptor        ?: (config: AxiosRequestConfig) => AxiosRequestConfig
    // requestInterceptorCatch   ?: (err: any) => any
    // responseStatusInterceptor ?: (status: number, res: AxiosResponse<any, any>) => string | void
    // responseInterceptor       ?: (res: AxiosResponse<any, any>) => AxiosResponse<any, any>
    // responseInterceptorCatch  ?: (err: any) => any
}

type HttpResponseBase = { server_date?: string; server_time?: number }
type HttpResponseOk<T = unknown> = { ok: true; data: T } & HttpResponseBase
type HttpResponseFail = { ok: false; err: string } & HttpResponseBase

/**
 * 1. 支持全局配置 Loading、showError、delay、
 * 2. 支持并发请求，共用 loading 和 showError (待完成)
 * 3. 支持取消请求
 * 4. 支持拦截器
 * 5. 状态码处理
 */

export class Http {
    public axios           : AxiosInstance
    private baseURL        : string
    private showLoading    : boolean
    private showError      : boolean
    private showErrorMode  : string
    private delay          : number
    private onShowLoading ?: Function
    private onHideLoading ?: Function
    private onShowError   ?: Function
    private timeout_text   : string
    private default_err    : string

    static create(options?: HttpConfig) {
        return new Http(options)
    }

    constructor(options?: HttpConfig) {
        this.baseURL       = options?.baseURL || ''
        this.showLoading   = options?.showLoading === true
        this.showError     = options?.showError   === true
        this.showErrorMode = options?.showErrorMode || ''
        this.delay         = options?.delay ?? 300
        this.onShowLoading = options?.onShowLoading
        this.onHideLoading = options?.onHideLoading
        this.onShowError   = options?.onShowError
        this.timeout_text  = options?.timeout_text || '网络出了点问题，请稍后重试!'
        this.default_err   = options?.default_err  || '内部错误，请稍后再试！'

        // 创建 axios 实例
        this.axios = Axios.create({ ...options, baseURL: '' })

        // 内置状态码处理
        this.axios.interceptors.response.use((res) => {
            const status = res.status

            const validStatusCode = options?.validStatusCode
            if ( !validStatusCode ) return res

            const err = validStatusCode(status, res)
            if ( !err ) return res

            return { ...res, data: { ...res.data, err, ok: false } }
        })

        // 内置状态码处理
        // this.axios.interceptors.response.use((res) => {
        //     const status = res.status

        //     const valid_status = options?.responseStatusInterceptor
        //     if ( !valid_status ) return res

        //     const err = valid_status(status, res)
        //     if ( !err ) return res

        //     return { ...res, data: { ...res.data, err, ok: false } }
        // })

        // // 补充拦截器
        // this.axios.interceptors.request.use(
        //     options?.requestInterceptor,
        //     options?.requestInterceptorCatch,
        // )

        // this.axios.interceptors.response.use(
        //     options?.responseInterceptor,
        //     options?.requestInterceptorCatch,
        // )
    }

    public get CancelToken() {
        return Axios.CancelToken
    }

    public get(url: string, params?: Record<string, any>, config?: HttpRequestConfig) {
        return this.request({
            ...config || {},
            method: 'GET',
            url   : this.getUrl(url),
            params: {
                ...(config?.params || {}),
                ...(params || {}),
            },
        })
    }

    public post(url: string, params?: Record<string, any>, config?: HttpRequestConfig) {
        return this.request({
            ...config || {},
            method: 'POST',
            url   : this.getUrl(url),
            data  : params || {},
        })
    }

    public put(url: string, params?: Record<string, any>, config?: HttpRequestConfig) {
        return this.request({
            ...config || {},
            method: 'PUT',
            url   : this.getUrl(url),
            data  : params || {},
        })
    }

    public delete(url: string, params?: Record<string, any>, config?: HttpRequestConfig) {
        return this.request({
            ...config || {},
            method: 'DELETE',
            url   : this.getUrl(url),
            params,
        })
    }

    public upload(url: string, params?: Record<string, any>, config?: HttpRequestConfig) {
        return this.request({
            ...config || {},
            method : 'POST',
            url    : this.getUrl(url),
            data   : params || {},
            headers: {
                'Content-Type': 'multipart/form-data',
                'charset'     : 'utf-8',
            },
        })
    }

    // 发送请求
    private request<T = unknown>(config: HttpRequestConfig): Promise<HttpResponseOk<T> | HttpResponseFail>
    {
        return new Promise((resolve) => {
            // 获取 Loading 配置
            const loading_conf = this.getLoadingConfig(config)

            // 非多请求根据配置显示 Loading
            let loading_timer: ReturnType<typeof setTimeout>
            let loading_time = 0
            if (loading_conf.showLoading && this.onShowLoading) {
                loading_time  = Date.now()
                loading_timer = setTimeout(() => {
                    this.onShowLoading!()
                }, loading_conf.delay)
            }

            this.axios(config)
                .then((response: any) => {
                    let diff_time = 0
                    if (!loading_conf.delay && loading_time) {
                        // 无延迟，确保 loading 出现 300 毫秒
                        if (loading_time && (Date.now() - loading_time) < 300) {
                            diff_time = 300 - (Date.now() - loading_time)
                        }
                    } else if (loading_time) {
                        const time = Date.now() - loading_time
                        if (time > loading_conf.delay && (time - loading_conf.delay) < loading_conf.delay) {
                            diff_time = loading_conf.delay - (time - loading_conf.delay)
                        }
                    }

                    setTimeout(() => {
                        clearTimeout(loading_timer)
                        loading_timer && this.onHideLoading && this.onHideLoading()
                    }, diff_time)

                    // 异构后端返回数据结构
                    const res  = response.data
                    const ok   = res.ok   || res.result
                    const err  = res.err  || res.msg || res.message
                    const data = res.data || res.res || { ...res }

                    if (ok) {
                        resolve({ ...res, ok, err, data })
                    } else {
                        const err_msg = err || this.default_err

                        // 显示错误信息
                        if (loading_conf.showError && this.onShowError) {
                            this.onShowError(err_msg, loading_conf)
                        }

                        resolve({ ...res, ok: false, err: err_msg })
                    }
                })
                .catch((err: any) => {
                    // 发生错误，则立即清除 Loading
                    clearTimeout(loading_timer)
                    loading_timer && this.onHideLoading && this.onHideLoading()

                    // 网络超时
                    let err_msg = this.default_err
                    if (err?.code && err.code === 'ERR_CANCELED') {
                        err_msg = '' // 取消的请求不作为异常信息显示
                    } else if (err.message) {
                        if (/timeout\sof\s\d+ms\sexceeded/.test(err.message)) {
                            err_msg = this.timeout_text
                        } else {
                            err_msg = err.message
                        }
                    }

                    // 显示异常信息
                    if (loading_conf.showError && this.onShowError && err_msg) {
                        this.onShowError(err_msg, loading_conf)
                    }

                    resolve({ ok: false, err: err_msg })
                })
        })
    }

    // 获取 Loading 配置
    private getLoadingConfig(config?: HttpRequestConfig) {
        let delay = this.delay
        if (config?.delay === false) {
            delay = 0
        } else if (typeof config?.delay === 'number') {
            delay = config.delay
        }

        return {
            showLoading  : config?.showLoading   ?? this.showLoading,
            showError    : config?.showError     ?? this.showError,
            showErrorMode: config?.showErrorMode ?? this.showErrorMode,
            delay        ,
        }
    }

    // 获取当前请求地址
    private getUrl(url: string) {
        if (/^https?::\/\//.test(url)) return url

        const baseURL = this.baseURL.replace(/\/?$/, '')
        url = url.replace(/^\/?/, '')

        return `${ baseURL }/${ url }`
    }
}

export { Axios }

export function getCancelTokenSource() {
    return Axios.CancelToken.source()
}

export function createHttp(options?: HttpConfig) {
    return new Http(options)
}
