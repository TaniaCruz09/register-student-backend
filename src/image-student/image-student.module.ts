import { Module } from '@nestjs/common';
import { ImageStudentService } from './image-student.service';
import { ImageStudentController } from './image-student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageStudent } from './entities/image-student.entity';

@Module({
  controllers: [ImageStudentController],
  providers: [ImageStudentService],
})
export class ImageStudentModule {}
