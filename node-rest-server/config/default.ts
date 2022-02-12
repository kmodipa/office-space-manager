export default {
    port: process.env.PORT,
    dbUri: process.env.DB_CONNECTION,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
    refreshTokenPrivateKey: process.env.REFRESH_PRIVATE_KEY,
    refreshTokenPublicKey: process.env.REFRESH_PUBLIC_KEY,
}