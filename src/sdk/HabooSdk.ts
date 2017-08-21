import { ErrorResponse } from "./";

export default class HabooSdk {

    constructor(private apiUrl: string, private publicKey: string, private tokenGet: () => string) {

    }

    private checkStatus = (response: Response) => {

        if (!response.ok) {
            // (response.status < 200 || response.status > 300)
            const error = new ErrorResponse(response.statusText);
            error.response = response;
            throw error;
        }

        return response;
    }

    private parseJson = (response: Response) => {
        return response.json();
    }

    private fetchReq(url: string, method: string, data: any) {
        const token = this.tokenGet();
        let headers = {
            "Content-Type": "application/json"
        };

        if (!!token) {
            headers = Object.assign(headers, { "Authorization": `Bearer ${token}` });
        }

        return fetch(`${this.apiUrl}${url}`, {
            method,
            body: !!data ? JSON.stringify(data) : null,
            headers
        })
            .then(this.checkStatus)
            .then(this.parseJson);
    }

    private fetchPost(url: string, data: any) {
        return this.fetchReq(url, "POST", data);
    }

    private fetchGet(url: string) {
        return this.fetchReq(url, "POST", null);
    }

    public login(email: string, password: string) {
        return this.fetchPost("/api/identity/user/cms/login", {
            public_key: this.publicKey,
            email,
            password
        });
    }
}