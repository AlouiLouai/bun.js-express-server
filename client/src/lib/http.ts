export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface HttpRequestOptions {
  method: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private buildUrl(
    endpoint: string,
    queryParams?: Record<string, string | number>
  ): string {
    const url = new URL(endpoint, this.baseUrl);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) =>
        url.searchParams.append(key, String(value))
      );
    }
    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    options: HttpRequestOptions
  ): Promise<T> {
    const url = this.buildUrl(endpoint, options.queryParams);

    const response = await fetch(url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  public get<T>(
    endpoint: string,
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'GET', queryParams, headers });
  }

  public post<T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'POST', body, headers });
  }

  public put<T>(
    endpoint: string,
    body: unknown,
    headers?: Record<string, string>
  ) {
    return this.request<T>(endpoint, { method: 'PUT', body, headers });
  }

  public delete<T>(endpoint: string, headers?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'DELETE', headers });
  }
}

export default HttpClient;
