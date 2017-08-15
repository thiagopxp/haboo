export default class HabooSdk {
    constructor(private apiUrl: string) {
    }

    async login(publicKey: string) {
        const res = await fetch(`${this.apiUrl}/api/identity/environment/login`, {
            method: 'POST',
            body: JSON.stringify({ public_key: publicKey}),
            headers: { 'Content-Type': 'application/json' }
        });

        return res.json();
    }
}