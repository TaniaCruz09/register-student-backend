import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Notes } from 'src/notes/entities/notes.entity';
import { ImageStudent } from 'src/image-student/entities/image-student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Notes, ImageStudent])],
  controllers: [StudentController],
  providers: [StudentsService],
})
export class StudentsModule {}
