import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDTO } from './dto/student.dto';
import { ImageStudent } from 'src/image-student/entities/image-student.entity';
import { Notes } from 'src/notes/entities/notes.entity';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,

    @InjectRepository(ImageStudent)
    private readonly imageStudentRepository: Repository<ImageStudent>,

    @InjectRepository(ImageStudent)
    private readonly dataSource: DataSource,
  ) {}

  //metodo para crear un estudiante
  async createStudent(studentDTO: CreateStudentDTO) {
    const { imageStudent, ...detalleStudent } = studentDTO;

    //agregar la imagen
    const imag = this.imageStudentRepository.create({ url: imageStudent });
    //agregar el estudiante
    const student = this.studentRepository.create({
      ...detalleStudent,
      imageStudent: await this.imageStudentRepository.save(imag),
    });

    await this.studentRepository.save(student);
    return student;
  }

  //metodo para visualizar todos lo estudiantes con sus notas
  async getStudents() {
    return this.studentRepository.find({
      relations: ['notes', 'imageStudent'],
    });
  }

  //metodo para visualizar un estudiante por su id
  async getStudentById(id: string) {
    return this.studentRepository.findOneBy({ id });
  }

  //metodo para actualizar datos del estudiante
  async updateStudent(id: string, cambios: CreateStudentDTO) {
    const { imageStudent, ...updateAll } = cambios;
    const student = await this.studentRepository.preload({
      id: id,
      ...updateAll,
    });

    //Consultar a la base de datos para modificarla
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    //si vienen nueva imagen que se se agregue
    if (imageStudent !== undefined) {
      const imag = this.imageStudentRepository.create({ url: imageStudent });
      student.imageStudent = await this.imageStudentRepository.save(imag);
    }

    await queryRunner.manager.save(student);
    await queryRunner.commitTransaction();
    await queryRunner.release();
    return student;
  }

  //metodo para eliminar a un estudiante
  async deleteStudent(id: string) {
    const student = await this.getStudentById(id);
    await this.studentRepository.remove(student);
    return 'Estudiante eliminado satisfactoriamente';
  }
}
