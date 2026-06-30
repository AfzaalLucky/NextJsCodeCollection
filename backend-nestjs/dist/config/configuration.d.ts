declare const _default: () => {
    port: number;
    nodeEnv: string;
    wordpress: {
        baseUrl: string;
        apiUrl: string;
        username: string;
        appPassword: string;
    };
    security: {
        apiKey: string;
        allowedOrigins: string[];
    };
    cache: {
        ttl: number;
    };
};
export default _default;
