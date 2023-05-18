import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageStudentDTO {
  @IsString()
  @IsNotEmpty()
  url: string;
}
