import axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
export default class BaseApi{
    public requestUrl: string;
    public apiUrl: string;
    constructor(controller: string) {
        this.apiUrl = process.env.VUE_APP_API_URL;
        this.requestUrl = `${this.apiUrl}/${controller}`;
    }
    public request<T>(method: Method, action: string = '', data: any = null, params?: object):AxiosPromise<T> {
        const config: AxiosRequestConfig = {
            method,
            url: `${this.requestUrl}/${action}`,
            data,
            params
        };
        return axios(config);
    }
}
