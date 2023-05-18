import { Student } from 'src/students/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageStudent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;
}
