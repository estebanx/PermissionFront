import { EntityValidationResult } from '../models/entity.validation.model';
import ApiClient from './api.base';

export default class BaseService<T>{
    public client: ApiClient;
    constructor(public controller: string) {
        this.client = new ApiClient(controller);
    }
    public async getById(id: number): Promise<T> {
        try {
            const res = await this.client.request<T>('GET', id.toString());
            return res.data;
        } catch (error) {
            throw error;
        }

    }
    public async get(): Promise<T[]> {
        try {
            const res = await this.client.request<T[]>('GET', '');
            return res.data;
        } catch (error) {
            throw error;
        }
    }
    public async add(entity: T): Promise<T> {
        try {
            const res = await this.client.request<EntityValidationResult<T>>('POST','',entity);
            return res.data.data;
        } catch (error) {
            throw error;
        }
    }
    public async update(entity: T): Promise<T> {
        try {
            const res = await this.client.request<EntityValidationResult<T>>('PUT', '', entity);
            return res.data.data;
        } catch (error) {
            throw error;
        }
    }
    public async delete(id: Number): Promise<T> {
        try {
            const res = await this.client.request<T>('DELETE', id.toString());
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}
