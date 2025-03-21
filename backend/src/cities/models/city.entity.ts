import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  name_native: string;

  @Column()
  country: string;

  @Column()
  continent: string;

  @Column('decimal')
  latitude: number;

  @Column('decimal')
  longitude: number;

  @Column()
  population: number;

  @Column()
  founded: number;

  @Column('text', { array: true })
  landmarks: string[];
}
