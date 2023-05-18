import { ImageStudent } from '../../image-student/entities/image-student.entity';
import { Notes } from 'src/notes/entities/notes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  grade: string;

  @Column({ type: 'numeric' })
  year: number;

  @Column({ type: 'text' })
  shift: string;

  @OneToMany(() => Notes, (notes) => notes.students, {
    cascade: true,
    eager: true,
  })
  notes?: Notes[];

  @OneToOne(() => ImageStudent)
  @JoinColumn()
  imageStudent?: ImageStudent;
}
