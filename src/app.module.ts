import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrigadasModule } from './brigadas/brigadas.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, BrigadasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}