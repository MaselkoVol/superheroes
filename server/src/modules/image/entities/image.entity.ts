import { Superhero } from 'src/modules/superhero/entities/superhero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Superhero, (superhero) => superhero.images)
  superhero: Superhero;

  @Column('text', { unique: true })
  path: string;
}
