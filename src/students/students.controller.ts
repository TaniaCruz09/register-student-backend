import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CreateStudentDTO } from './dto/student.dto';
import { StudentsService } from './students.service';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { fileFilter } from 'src/image-student/helpers/fileFilter.helper';
import { fileName } from 'src/image-student/helpers/fileName.helper';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentsService) {}

  //metodo para crear un estudiante con una imagen
  @Post()
  @UseInterceptors(
    FileInterceptor('imageStudent', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/students',
        filename: fileName,
      }),
    }),
  )
  uploadProductImage(
    @Body() productDTO: CreateStudentDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Asegurese que el archivo es una imagen');
    }

    return this.studentService.createStudent({
      ...productDTO,
      imageStudent: file.filename,
    });
  }

  //metodo para ver todos los estudiantes
  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  //metodo para visualizar un estudiante en especifico(pasando su id)
  @Get(':id')
  getStudentById(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.getStudentById(id);
  }

  //metodo para borrar un estudiante
  @Delete(':id')
  deleteStudent(@Param('id', ParseUUIDPipe) id: string) {
    return this.studentService.deleteStudent(id);
  }

  //metodo que actualiza datos del estudiante (pasando su id)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('imageStudent', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/students',
        filename: fileName,
      }),
    }),
  )
  updateStudent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() productDTO: CreateStudentDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.studentService.updateStudent(id, {
      ...productDTO,
      imageStudent: file.filename,
    });
  }
}

//creo que es para ir guardando las imagenes de estudianntes en el destino
export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};
