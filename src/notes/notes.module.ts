import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Notes } from './entities/notes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/students/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notes, Student])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
