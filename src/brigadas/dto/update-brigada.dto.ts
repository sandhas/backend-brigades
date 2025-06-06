import { PartialType } from '@nestjs/mapped-types';
import { CreateBrigadaDto } from './create-brigada.dto';

export class UpdateBrigadaDto extends PartialType(CreateBrigadaDto) {}
