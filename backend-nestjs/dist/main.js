"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    const allowedOrigins = config.get('security.allowedOrigins');
    app.enableCors({
        origin: allowedOrigins,
        methods: ['GET', 'HEAD'],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: false,
    }));
    const port = config.get('port');
    await app.listen(port, '0.0.0.0');
    console.log(`NestJS API running on port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map