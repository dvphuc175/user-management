import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], 
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: +configService.get<string>('DB_PORT')!,
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      // url:'postgresql://neondb_owner:npg_9vnXT3yERcwu@ep-jolly-grass-a135l37l-pooler.ap-southeast-1.aws.neon.tech/dbtest?sslmode=require',
      entities: [User],
      synchronize: true, 
      })
    }),
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // kiểm tra roles
    },
  ],
})
export class AppModule {}
