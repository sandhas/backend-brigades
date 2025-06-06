import { Module } from '@nestjs/common';
import { BrigadasService } from './brigadas.service';
import { BrigadasController } from './brigadas.controller';

@Module({
  controllers: [BrigadasController],
  providers: [BrigadasService],
})
export class BrigadasModule {}
