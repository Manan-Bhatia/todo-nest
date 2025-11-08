import { Module, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { environmentConfiguration } from './global/configuration/configuration';
import { validateEnvironmentVariables } from './global/configuration/validation';

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
        environmentConfiguration,
      ],
    }),
    UserModule,
    AuthModule,
    TaskModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('db.host'),
        port: configService.getOrThrow('db.port'),
        username: configService.getOrThrow('db.username'),
        password: configService.getOrThrow('db.password'),
        database: configService.getOrThrow('db.database'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('jwt.secret'),
        signOptions: { expiresIn: '15m' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    // validate environment variables
    validateEnvironmentVariables();
  }
}
