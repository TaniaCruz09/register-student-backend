import { Controller } from '@nestjs/common';
import { ImageStudentService } from './image-student.service';

@Controller('image-student')
export class ImageStudentController {
  constructor(private readonly imageStudentService: ImageStudentService) {}
}
