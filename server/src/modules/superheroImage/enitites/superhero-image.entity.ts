import { Superhero } from 'src/modules/superhero/entities/superhero.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('superhero_image')
export class SuperheroImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Superhero, (superhero) => superhero.images)
  superhero: Superhero;

  @Column('text')
  imageUrl: string;
}
