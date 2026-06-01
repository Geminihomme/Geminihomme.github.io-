export interface RequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: string,
    public readonly url: string,
  ) {
    super(`HTTP ${status} from ${url}`);
    this.name = "HttpError";
  }
}

// Base authenticated HTTP client.
// Each connector extends or wraps this with provider-specific auth headers.
export class AuthenticatedHttpClient {
  constructor(
    protected readonly baseUrl: string,
    protected readonly defaultHeaders: Record<string, string> = {},
  ) {}

  async request<T>(path: string, options: RequestOptions = {}): Promise<ApiResponse<T>> {
    const { method = "GET", body, headers = {}, timeoutMs = 30_000 } = options;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const url = `${this.baseUrl}${path}`;

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...this.defaultHeaders,
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }

    const text = await response.text();

    if (!response.ok) {
      throw new HttpError(response.status, text, url);
    }

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return {
      data: text ? (JSON.parse(text) as T) : ({} as T),
      status: response.status,
      headers: responseHeaders,
    };
  }

  async get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    const res = await this.request<T>(path, { headers });
    return res.data;
  }

  async post<T>(path: string, body: unknown, headers?: Record<string, string>): Promise<T> {
    const res = await this.request<T>(path, { method: "POST", body, headers });
    return res.data;
  }
}
