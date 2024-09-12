import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['date'])
export class Voo{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    codigoVoo: string;

    @Column()
    origemCEP: string;

    @Column()
    origemPais: string;

    @Column()
    origemCidade: string;

    @Column()
    origemEstado: string;

    @Column()
    destinoCEP: string;

    @Column()
    destinoPais: string;

    @Column()
    destinoCidade: string;

    @Column()
    destinoEstado: string;

    @Column()
    date: Date;

}