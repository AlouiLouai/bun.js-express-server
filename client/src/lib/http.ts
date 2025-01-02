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

  private getAuthToken(): string | null {
    // Utility to get the value of a cookie by its name
    const name = "access_token=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArr = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArr.length; i++) {
      let c = cookieArr[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null; // Return null if the cookie is not found
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
    const authToken = this.getAuthToken();

    const response = await fetch(url, {
      method: options.method,
      headers: {
        'Content-Type': 'application/json',
        ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    console.log('Request Headers:', {
      'Content-Type': 'application/json',
      ...(authToken ? { 'Authorization': `Bearer ${authToken}` } : {}),
      ...(options.headers || {}),
    })
    

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
