"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: parseInt(process.env.PORT, 10) || 3001,
    nodeEnv: process.env.NODE_ENV || 'development',
    wordpress: {
        baseUrl: process.env.WP_BASE_URL || 'http://localhost',
        apiUrl: process.env.WP_API_URL || 'http://localhost/wp-json/wp/v2',
        username: process.env.WP_USERNAME || '',
        appPassword: process.env.WP_APP_PASSWORD || '',
    },
    security: {
        apiKey: process.env.API_KEY || 'dev-key',
        allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(','),
    },
    cache: {
        ttl: parseInt(process.env.CACHE_TTL, 10) || 300,
    },
});
//# sourceMappingURL=configuration.js.map