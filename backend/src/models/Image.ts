import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('images')  //Para o decorator associar a nossa classe a tabela orphanages
export default class Image {
  @PrimaryGeneratedColumn('increment') //Para associar a uma chave primaria
  id: number;

  @Column() 
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanage_id'})
  orphanage: Orphanage;
}