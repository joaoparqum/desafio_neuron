import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Voo } from './voos.entity';
import * as moment from 'moment'; 

@Injectable()
export class VoosService {
  constructor(
    @InjectRepository(Voo)
    private flightsRepository: Repository<Voo>,
  ) {}

  async createFlight(flightData: Partial<Voo>): Promise<Voo> {
    const { date, destinoCidade, destinoPais } = flightData;

    // Verifica se já existe um voo para o mesmo destino no mesmo dia
    const existingFlight = await this.flightsRepository.findOne({
      where: {
        destinoCidade,
        destinoPais,
        date: Between(
            moment(date).startOf('day').toDate(),
            moment(date).endOf('day').toDate(),
          ), 
      },
    });

    if (existingFlight) {
      throw new BadRequestException(
        'Já existe um voo para o mesmo destino neste dia.',
      );
    }

    // Verifica diferença mínima de 30 minutos
    const flights = await this.flightsRepository.find();
    for (const flight of flights) {
      const flightTime = new Date(flight.date).getTime();
      const newFlightTime = new Date(date).getTime();

      if (Math.abs(newFlightTime - flightTime) < 30 * 60 * 1000) {
        throw new BadRequestException(
          'Os voos devem ter ao menos 30 minutos de diferença.',
        );
      }
    }

    const codigoVoo = `FL${Math.floor(Math.random() * 100000)}`;

    const newFlight = this.flightsRepository.create({
      ...flightData,
      codigoVoo,
    });
    return this.flightsRepository.save(newFlight);
  }

  async updateFlight(id: number, flightData: Partial<Voo>): Promise<Voo> {
    await this.flightsRepository.update(id, flightData);
    return this.flightsRepository.findOne({ where: { id } });
  }

  async getAllFlights(): Promise<Voo[]> {
    return this.flightsRepository.find();
  }

  async getFlightById(id: number): Promise<Voo> {
    return this.flightsRepository.findOne({ where: { id } });
  }

  async deleteFlight(id: number): Promise<void> {
    await this.flightsRepository.delete(id);
  }
}