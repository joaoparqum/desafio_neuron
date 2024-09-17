import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Voo } from './voos.entity';
import * as moment from 'moment'; 

@Injectable()
export class VoosService {
  constructor(
    @InjectRepository(Voo)
    private voosRepository: Repository<Voo>,
  ) {}

  async createFlight(flightData: Partial<Voo>): Promise<Voo> {
    const { date, destinoCidade, destinoPais } = flightData;

    const vooExistente = await this.voosRepository.findOne({
      where: {
        destinoCidade,
        destinoPais,
        date: Between(
            moment(date).startOf('day').toDate(),
            moment(date).endOf('day').toDate(),
          ), 
      },
    });

    if (vooExistente) {
      throw new BadRequestException(
        'Já existe um voo para o mesmo destino neste dia.',
      );
    }

    const voos = await this.voosRepository.find();
    for (const voo of voos) {
      const tempoDeVoo = new Date(voo.date).getTime();
      const novoTempoDeVoo = new Date(date).getTime();

      if (Math.abs(novoTempoDeVoo - tempoDeVoo) < 30 * 60 * 1000) {
        throw new BadRequestException(
          'Os voos devem ter ao menos 30 minutos de diferença.',
        );
      }
    }

    const codigoVoo = `FL${Math.floor(Math.random() * 100000)}`;

    const novoVoo = this.voosRepository.create({
      ...flightData,
      codigoVoo,
    });
    return this.voosRepository.save(novoVoo);
  }

  async updateFlight(id: number, flightData: Partial<Voo>): Promise<Voo> {
    await this.voosRepository.update(id, flightData);
    return this.voosRepository.findOne({ where: { id } });
  }

  async getAllFlights(): Promise<Voo[]> {
    return this.voosRepository.find();
  }

  async getFlightById(id: number): Promise<Voo> {
    return this.voosRepository.findOne({ where: { id } });
  }

  async getFlightByCode(codigoVoo: string): Promise<Voo> {
    return this.voosRepository.findOne({ where: { codigoVoo } });
  }

  async deleteFlight(id: number): Promise<void> {
    await this.voosRepository.delete(id);
  }
}