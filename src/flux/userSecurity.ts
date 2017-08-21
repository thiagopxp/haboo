import browserStorage from "./browserStorage";
import * as jwt_decode from "jwt-decode";
import { JwtHelper } from "./jwtHelper";
import { IUserProfile } from "@haboo/haboo-sdk";

const TOKEN_NAME = "id_token";

interface IUserSecurity {
    get(): string;
    set(token: string): void;
    del(): void;
    getProfile(): IUserProfile;
    isExpired(): boolean;
}

class UserSecurity implements IUserSecurity {

    public set(token: string) {
        browserStorage.set(TOKEN_NAME, token);
    }

    public get(): string {
        return browserStorage.get(TOKEN_NAME) || null;
    }

    public getProfile(): IUserProfile {
        const token = this.get();
        if (!!token) {
            return jwt_decode<IUserProfile>(token);
        }
        return null;
    }

    public isExpired(): boolean {
        const token = this.get();
        if (!!token) {
            return JwtHelper.isTokenExpired(this.get());
        }
        return true;
    }

    public del() {
        browserStorage.del(TOKEN_NAME);
    }
}

export { IUserSecurity };
export default new UserSecurity();
