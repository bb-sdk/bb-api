import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { RestClientOptions, serializeParams } from './requestUtils';
import { checkWebCryptoAPISupported, signMessage } from './webCryptoAPI';

export default abstract class BaseRestClient {
  private options: RestClientOptions;
  private baseUrl: string;
  private globalRequestOptions: AxiosRequestConfig;
  private key: string | undefined;
  private secret: string | undefined;

  constructor(
    baseUrl: string,
    restOptions: RestClientOptions = {},
    networkOptions: AxiosRequestConfig = {},
  ) {
    this.options = {
      authMethod: 'time-window',
      timeWindow: 5000,
      throwExceptions: false,
      strict_param_validation: false,
      ...restOptions,
    };

    this.baseUrl = baseUrl;
    this.key = this.options.key;
    this.secret = this.options.secret;

    this.globalRequestOptions = {
      timeout: 1000 * 60 * 5,
      ...networkOptions,
      headers: {
        'Content-Type': 'application/json',
        ...networkOptions.headers,
      },
    };

    if (!!this.key !== !!this.secret) {
      throw new Error('API Key & Secret are both required for private endpoints');
    }

    if (this.key && this.secret && !this.options.customSignMessageFn) {
      checkWebCryptoAPISupported();
    }
  }

  protected get<TResponse extends { success: 0 | 1 }, TParams extends object = object>(
    endpoint: string,
    params?: TParams,
  ): Promise<TResponse> {
    return this._call<TResponse, TParams>('GET', endpoint, params, false);
  }

  protected getPrivate<TResponse extends { success: 0 | 1 }, TParams extends object = object>(
    endpoint: string,
    params?: TParams,
  ): Promise<TResponse> {
    return this._call<TResponse, TParams>('GET', endpoint, params, true);
  }

  protected post<TResponse extends { success: 0 | 1 }, TParams extends object = object>(
    endpoint: string,
    params?: TParams,
  ): Promise<TResponse> {
    return this._call<TResponse, TParams>('POST', endpoint, params, false);
  }

  protected postPrivate<TResponse extends { success: 0 | 1 }, TParams extends object = object>(
    endpoint: string,
    params?: TParams,
  ): Promise<TResponse> {
    return this._call<TResponse, TParams>('POST', endpoint, params, true);
  }

  private async doSign(message: string): Promise<string> {
    if (typeof this.options.customSignMessageFn === 'function') {
      return this.options.customSignMessageFn(message, this.secret!);
    }
    return signMessage(message, this.secret!);
  }

  private async buildAuthHeaders(
    method: 'GET' | 'POST',
    path: string,
    queryString: string,
    body: string,
  ): Promise<Record<string, string>> {
    if (!this.key || !this.secret) {
      throw new Error('Private endpoints require api and private keys set');
    }

    if (this.options.authMethod === 'nonce') {
      const nonceStr = String(Date.now());

      const qs = queryString ? `?${queryString}` : '';
      const signStr = method === 'GET' ? `${nonceStr}${path}${qs}` : `${nonceStr}${body}`;

      const signature = await this.doSign(signStr);
      return {
        'ACCESS-KEY': this.key,
        'ACCESS-NONCE': nonceStr,
        'ACCESS-SIGNATURE': signature,
      };
    }

    // ACCESS-TIME-WINDOW method (default)
    const timestamp = Date.now();
    const timeWindow = String(this.options.timeWindow ?? 5000);

    const qs = queryString ? `?${queryString}` : '';
    const signStr =
      method === 'GET'
        ? `${timestamp}${timeWindow}${path}${qs}`
        : `${timestamp}${timeWindow}${body}`;

    const signature = await this.doSign(signStr);
    return {
      'ACCESS-KEY': this.key,
      'ACCESS-REQUEST-TIME': String(timestamp),
      'ACCESS-TIME-WINDOW': timeWindow,
      'ACCESS-SIGNATURE': signature,
    };
  }

  private cleanParams<T extends object>(params?: T): Record<string, unknown> | undefined {
    if (!params) return undefined;
    return Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined),
    );
  }

  private async _call<TResponse extends { success: 0 | 1 }, TParams extends object = object>(
    method: 'GET' | 'POST',
    endpoint: string,
    params?: TParams,
    requiresAuth?: boolean,
  ): Promise<TResponse> {
    const cleanedParams = this.cleanParams(params);
    const requestUrl = [this.baseUrl, endpoint].join(
      endpoint.startsWith('/') ? '' : '/',
    );

    const options: AxiosRequestConfig = {
      ...this.globalRequestOptions,
      url: requestUrl,
      method,
    };

    if (!requiresAuth) {
      if (method === 'GET' && cleanedParams) {
        options.params = cleanedParams;
      } else if (method === 'POST' && cleanedParams) {
        options.data = cleanedParams;
      }
    } else {
      let queryString = '';
      let bodyStr = '';

      if (method === 'GET') {
        queryString = serializeParams(cleanedParams ?? {}, this.options.strict_param_validation);
      } else {
        bodyStr = JSON.stringify(cleanedParams ?? {});
      }

      const signPath = this.getSignPath(endpoint);
      const authHeaders = await this.buildAuthHeaders(method, signPath, queryString, bodyStr);

      options.headers = { ...options.headers, ...authHeaders };

      if (method === 'GET') {
        if (queryString) {
          options.url = `${requestUrl}?${queryString}`;
        }
      } else {
        options.data = cleanedParams ?? {};
      }
    }

    return axios(options)
      .then((response: AxiosResponse<TResponse>) => {
        if (response.status === 200) {
          const result = response.data;

          if (this.options.throwExceptions && result.success === 0) {
            throw result;
          }

          return result;
        }
        throw response;
      })
      .catch((e: unknown) => this.parseException(e));
  }

  protected getSignPath(endpoint: string): string {
    return endpoint;
  }

  protected parseException(e: unknown): never {
    if (axios.isAxiosError(e)) {
      if (e.response) {
        throw {
          code: e.response.status,
          message: e.response.statusText,
          body: e.response.data,
          headers: e.response.headers,
        };
      }
      if (e.request) {
        throw e;
      }
      throw e.message;
    }
    throw e;
  }
}
