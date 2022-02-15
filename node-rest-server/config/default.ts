export default {
    port: process.env.PORT || 5000,
    dbUri: "mongodb+srv://khomotjo:khomotjo@cluster0.uouuo.mongodb.net/office-space-manager?retryWrites=true&w=majority",
    accessTokenPrivateKey: `MIICXgIBAAKBgQDT7teFaR94ujTLkkMRq/ECNnfFuxqt6qFFR69lNaZAUB8Hw/k5`,
    accessTokenPublicKey: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDT7teFaR94ujTLkkMRq/ECNnfF`,
    refreshTokenPrivateKey: '',
    refreshTokenPublicKey: '',
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
}