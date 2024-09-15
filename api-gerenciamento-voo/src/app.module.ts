import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voo } from './voos/voos.entity';
import { VooModule } from './voos/voo.module';
import { VoosService } from './voos/voos.service';
import { VoosController } from './voos/voos.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'voo-db',
      entities: [Voo],
      synchronize: true,  
    }),
    VooModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
