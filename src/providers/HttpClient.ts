import {RequestConfig} from '@/providers/HttpProvider';

export type RequestMethod = 'delete' | 'get' | 'post' | 'put';

interface HttpClient {
    /**
     * Makes a delete request.
     */
    delete(url: string, config?: Record<string, any>): Promise<any>;

    /**
     * Makes a get request.
     */
    get(url: string, config?: Record<string, any>): Promise<any>;

    /**
     * Makes a patch request.
     */
    patch(url: string, config?: Record<string, any>): Promise<any>;

    /**
     * Makes a post request.
     */
    post(url: string, config?: Record<string, any>): Promise<any>;

    /**
     * Makes a put request.
     */
    put(url: string, config?: Record<string, any>): Promise<any>;

    /**
     * Makes a generic request,
     */
    request(config: RequestConfig): Promise<any>;
}

export default HttpClient;
