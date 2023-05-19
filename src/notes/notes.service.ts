import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notes } from './entities/notes.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateNotesDto } from './dto/notes.dto';
import { Student } from 'src/students/entities/student.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Notes)
    private noteRepository: Repository<Notes>,

    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private readonly dataSource: DataSource,
  ) {}

  //ver notas
  async getNotes() {
    return this.noteRepository.find({
      relations: ['students'],
    });
  }

  //metodo para ver notas por su id
  async getNotesById(id: string) {
    return this.noteRepository.findOne({
      where: { id },
      relations: ['students'],
    });
  }
  //metodo para crear notas
  async createNotes(notesDTO: CreateNotesDto) {
    const { studentsId, ...detalleNotes } = notesDTO;

    const student = await this.studentRepository.findOneBy({ id: studentsId });
    const notes = this.noteRepository.create({
      ...detalleNotes,
      students: student,
    });

    return await this.noteRepository.save(notes);
  }

  //metodo para editar las notas
  async updateNotes(id: string, cambios: CreateNotesDto) {
    const { studentsId, ...detalleNotes } = cambios;

    const student = await this.studentRepository.findOneBy({ id: studentsId });

    const notes = await this.noteRepository.preload({
      id: id,
      ...detalleNotes,
      students: student,
    });

    //Consultar a la base de datos para modificarla
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    await queryRunner.manager.save(notes);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return notes;
  }

  //metodo para eliminar a un estudiante
  async deleteNotes(id: string) {
    const note = await this.getNotesById(id);
    await this.noteRepository.remove(note);
    return 'Notas eliminadas satisfactoriamente';
  }
}
