import jwt from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("accessTokenPrivateKey");
const publicKey = config.get<string>("accessTokenPublicKey");

export function signJwt( object: Object, options?: jwt.SignOptions | undefined) {
    // return jwt.sign(object, privateKey, {...(options && options), algorithm: "RS256"});
    try {
        return jwt.sign(object, privateKey);
    } catch(e: any) {
        return {
            valid: false,
            expired: "signJwt " + e.message,
            decoded: null
        };
    }

}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        };
    } catch (e: any) {
        return {
            valid: false,
            expired: "verifyTwt " + e.message,
            decoded: null
        };
    }
}