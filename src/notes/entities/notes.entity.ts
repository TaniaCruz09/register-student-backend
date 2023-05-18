import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Student } from '../../students/entities/student.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  math: number;

  @Column({ type: 'numeric' })
  science: number;

  @Column({ type: 'numeric' })
  language: number;

  @Column({ type: 'numeric' })
  social: number;

  @Column({ type: 'numeric' })
  art: number;

  @ManyToOne(() => Student, (students) => students.notes, {
    onDelete: 'CASCADE',
  })
  students: Student;
}
