import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseUUIDPipe,
  Patch,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNotesDto } from './dto/notes.dto';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  getNotes() {
    return this.notesService.getNotes();
  }

  @Get(':id')
  getNotesById(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.getNotesById(id);
  }

  @Post()
  createStudent(@Body() noteDTO: CreateNotesDto) {
    return this.notesService.createNotes(noteDTO);
  }

  @Patch(':id')
  updateNotes(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updates: CreateNotesDto,
  ) {
    return this.notesService.updateNotes(id, updates);
  }

  @Delete(':id')
  deleteNotes(@Param('id', ParseUUIDPipe) id: string) {
    return this.notesService.deleteNotes(id);
  }
}
