import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoosService } from './voos.service';
import { Voo } from './voos.entity';
import { VoosController } from './voos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Voo])],
  providers: [VoosService],
  controllers: [VoosController], 
})
export class VooModule {}
