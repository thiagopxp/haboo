import * as jwt_decode from "jwt-decode";

export class JwtHelper {

    public static isTokenExpired = (token: string, offsetSeconds?: number) => {
        const d = JwtHelper.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (d === null) {
            return false;
        }

        // Token expired?
        return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    private static getTokenExpirationDate = (token: string) => {
        const decoded = jwt_decode<any>(token);

        if (typeof decoded.exp === "undefined") {
            return null;
        }

        const d = new Date(0); // The 0 here is the key, which sets the date to the epoch
        d.setUTCSeconds(decoded.exp);

        return d;
    }
}
