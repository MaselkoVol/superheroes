import { Image } from 'src/modules/image/entities/image.entity';
import { Superpower } from 'src/modules/superpower/entities/superpower.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('superhero')
export class Superhero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  nickname: string;

  @Column('text')
  realName: string;

  @Column('text')
  originDescription: string;

  @Column('text')
  catchPhrase: string;

  @ManyToMany(() => Superpower)
  @JoinTable()
  superpowers: Superpower[];

  @OneToMany(() => Image, (image) => image.superhero)
  images: Image[];
}
