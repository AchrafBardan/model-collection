import HttpClient, {RequestMethod} from '../providers/HttpClient';
import axios, {AxiosResponse, CancelToken} from 'axios';
import HasHttpProvider from '../providers/HasHttpProvider';
import Provider from '../providers/Provider';

export interface RequestConfig {
    cancelToken?: CancelToken;
    data?: Record<string, any>;
    method?: RequestMethod;
    params?: Record<string, any>;
    url?: string;
}

class HttpProvider implements Provider {
    /**
     * The cancel token source. This is used to cancel a request.
     */
    source = axios.CancelToken.source();

    /**
     * @inheritdoc
     */
    cancel(message?: string): void {
        this.source.cancel(message);
    }

    /**
     * @inheritdoc
     */
    async create(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'post',
            model.getEndpoint('create'),
            {data: model.getSaveData(), ...config},
        );
    }

    /**
     * @inheritdoc
     */
    async delete(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'delete',
            model.getEndpoint('delete'),
            config,
        );
    }

    /**
     * @inheritdoc
     */
    async fetch(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'get',
            model.getEndpoint('fetch'),
            {params: model.getFetchParams(), ...config},
        );
    }

    /**
     * Returns the client that is used to make HTTP requests.
     */
    getHttpClient(): HttpClient {
        return axios;
    }

    /**
     * Makes an HTTP request.
     */
    async makeRequest(model: HasHttpProvider, method: RequestMethod, url: string, config: RequestConfig = {}): Promise<any> {
        model.cancelled = false;

        let result;

        const requestConfig: RequestConfig = {
            url,
            method,
            ...config,
            cancelToken: this.source.token,
        };

        try {
            result = await this.getHttpClient().request(requestConfig) as AxiosResponse;
        } catch (e: any) {
            model.errors.setResponse(e.response);

            if (e.response?.status === 422) {
                model.errors.setErrors(e.response.data.errors);
            }

            if (axios.isCancel(e)) {
                model.cancelled = e.message || true;
            }

            throw e;
        }

        return result.data;
    }

    /**
     * @inheritdoc
     */
    async update(model: HasHttpProvider, config: RequestConfig = {}): Promise<any> {
        return this.makeRequest(
            model,
            'put',
            model.getEndpoint('update'),
            {data: model.getSaveData(), ...config},
        );
    }
}

export default HttpProvider;
