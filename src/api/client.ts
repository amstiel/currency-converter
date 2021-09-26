enum HttpMethod {
    Get = 'GET',
    Post = 'POST',
}

type FetchBody = FormData | string | null;

export class ApiClient {
    constructor(private readonly baseUrl: string, private readonly apiKey: string) {}

    private request<T>(method: HttpMethod, url: string, body: FetchBody = null): Promise<T> {
        const init: RequestInit = {
            method,
            body,
        };

        const apiKeySeparator = url.includes('?') ? '&' : '?';

        return fetch(`${this.baseUrl}${url}${apiKeySeparator}apiKey=${this.apiKey}`, init).then(
            (response) => response.json()
        ) as Promise<T>;
    }

    get<Payload, Response>(url: string, payload: Payload | null = null): Promise<Response> {
        let queryUrl = url;

        if (payload instanceof Object && Object.keys(payload).length > 0) {
            const serializedPayload = new URLSearchParams(
                payload as unknown as URLSearchParams
            ).toString();

            queryUrl += `?${serializedPayload}`;
        }

        return this.request<Response>(HttpMethod.Get, queryUrl);
    }

    post<Payload, Response>(
        url: string,
        payload: Payload | Record<string, never> = {}
    ): Promise<Response> {
        return this.request<Response>(HttpMethod.Post, url, JSON.stringify(payload));
    }
}
