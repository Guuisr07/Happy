import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn} from 'typeorm';
//Aqui nesse caso e importado o OneToMany para criar o relacionamento de 1 orfanato pode ter muitas imagens

import Image from './Image';

@Entity('orphanages')  //Para o decorator associar a nossa classe a tabela orphanages
export default class Orphanage {
  @PrimaryGeneratedColumn('increment') //Para associar a uma chave primaria
  id: number;

  @Column() 
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string; 

  @Column()
  opening_hours: string;
  
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image => image.orphanage, {
    cascade: ['insert', 'update']
  }) 
  @JoinColumn({ name: 'orphanage_id'}) //Para mostrar em qual coluna esta havendo o relacionamento 
  images: Image[];
}