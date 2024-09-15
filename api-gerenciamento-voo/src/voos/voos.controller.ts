import { Controller, Post, Body, Patch, Param, Get, Delete } from '@nestjs/common';
import { VoosService } from './voos.service';
import { Voo } from './voos.entity';

@Controller('voos')
export class VoosController {
  constructor(private flightsService: VoosService) {}

  @Post()
  createFlight(@Body() flightData: Partial<Voo>): Promise<Voo> {
    return this.flightsService.createFlight(flightData);
  }

  @Patch(':id')
  updateFlight(
    @Param('id') id: number,
    @Body() flightData: Partial<Voo>,
  ): Promise<Voo> {
    return this.flightsService.updateFlight(id, flightData);
  }

   @Get()
   getAllFlights(): Promise<Voo[]> {
     return this.flightsService.getAllFlights();
   }

   @Get('code/:codigoVoo')
   async getFlightByCode(@Param('codigoVoo') codigoVoo: string): Promise<Voo> {
     return this.flightsService.getFlightByCode(codigoVoo);
   }
 
   @Get(':id')
   getFlightById(@Param('id') id: number): Promise<Voo> {
     return this.flightsService.getFlightById(id);
   }
 
   @Delete(':id')
   deleteFlight(@Param('id') id: number): Promise<void> {
     return this.flightsService.deleteFlight(id);
   }
}
