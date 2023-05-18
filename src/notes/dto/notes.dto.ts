import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotesDto {
  @IsNumber()
  @IsNotEmpty()
  math: number;

  @IsNumber()
  @IsNotEmpty()
  science: number;

  @IsNumber()
  @IsNotEmpty()
  language: number;

  @IsNumber()
  @IsNotEmpty()
  social: number;

  @IsNumber()
  @IsNotEmpty()
  art: number;

  @IsString()
  @IsNotEmpty()
  studentsId: string;
}
