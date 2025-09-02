import { request } from 'undici';

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { method = 'GET', headers = {}, body, timeout = 10000 } = options;

    const fullUrl = this.baseURL + url;
    const requestHeaders = { ...this.defaultHeaders, ...headers };

    try {
      const response = await request(fullUrl, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
        headersTimeout: timeout,
        bodyTimeout: timeout,
      });

      if (!response.statusCode || response.statusCode >= 400) {
        throw new Error(`HTTP Error: ${response.statusCode}`);
      }

      const data = await response.body.json();
      return data as T;
    } catch (error) {
      console.error('HTTP Request failed:', error);
      throw error;
    }
  }

  async get<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.makeRequest<T>(url, { method: 'GET', headers });
  }

  async post<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'POST', body, headers });
  }

  async put<T>(
    url: string,
    body?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.makeRequest<T>(url, { method: 'PUT', body, headers });
  }

  async delete<T>(url: string, headers?: Record<string, string>): Promise<T> {
    return this.makeRequest<T>(url, { method: 'DELETE', headers });
  }

  setAuthToken(token: string) {
    this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  removeAuthToken() {
    delete this.defaultHeaders['Authorization'];
  }
}

export const httpClient = new HttpClient(
  import.meta.env.VITE_API_BASE_URL || 'https://api.yourdomain.com'
);

export { HttpClient };
