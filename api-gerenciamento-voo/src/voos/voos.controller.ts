import { Controller, Post, Body, Param, Get, Delete, Put } from '@nestjs/common';
import { VoosService } from './voos.service';
import { Voo } from './voos.entity';

@Controller('voos')
export class VoosController {
  constructor(private voosService: VoosService) {}

  @Post()
  createFlight(@Body() flightData: Partial<Voo>): Promise<Voo> {
    return this.voosService.createFlight(flightData);
  }

  @Put(':id')
  updateFlight(
    @Param('id') id: number,
    @Body() flightData: Partial<Voo>,
  ): Promise<Voo> {
    return this.voosService.updateFlight(id, flightData);
  }

   @Get()
   getAllFlights(): Promise<Voo[]> {
     return this.voosService.getAllFlights();
   }

   @Get('code/:codigoVoo')
   async getFlightByCode(@Param('codigoVoo') codigoVoo: string): Promise<Voo> {
     return this.voosService.getFlightByCode(codigoVoo);
   }
 
   @Get(':id')
   getFlightById(@Param('id') id: number): Promise<Voo> {
     return this.voosService.getFlightById(id);
   }
 
   @Delete(':id')
   deleteFlight(@Param('id') id: number): Promise<void> {
     return this.voosService.deleteFlight(id);
   }
}
