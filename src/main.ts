import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

async function bootstrap() {
    dotenv.config();
    dotenv.config({ path: '.env.' + process.env.NODE_ENV || 'development'});
    console.log("!!!!!!!!!!!!!!!!! Don't forget to start mongodb\n");
    const app = await NestFactory.create(AppModule);
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    await app.init();
    await app.listen(process.env.PORT);
}
bootstrap();
