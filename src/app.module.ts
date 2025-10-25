import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { readFileSync } from 'fs';
import path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => {
          // load config json
          const config = JSON.parse(
            readFileSync(
              path.join(__dirname, 'global/environments/environment.json'),
              'utf-8',
            ),
          ) as Record<string, any>;

          // set env
          for (const key in config) {
            process.env[key] = config[key];
          }

          // return
          return config;
        },
        () => {
          // load secret json
          const secrets = JSON.parse(
            readFileSync(
              path.join(__dirname, 'global/secrets/secrets.json'),
              'utf-8',
            ),
          ) as Record<string, any>;

          // set env
          for (const key in secrets) {
            process.env[key] = secrets[key];
          }

          // return
          return secrets;
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
