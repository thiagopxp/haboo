export default class HabooSdk {
    constructor(private apiUrl: string, private publicKey: string) {
    }

    async login(email: string, password: string) {
        const res = await fetch(`${this.apiUrl}/api/identity/user/cms/login`, {
            method: 'POST',
            body: JSON.stringify({
                public_key: this.publicKey,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        return res.json();
    }
}