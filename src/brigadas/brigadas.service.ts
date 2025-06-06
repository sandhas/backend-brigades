import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateBrigadaDto } from './dto/create-brigada.dto';

@Injectable()
export class BrigadasService {
  constructor(private prisma: PrismaClient) {}

  create(dto: CreateBrigadaDto) {
    return this.prisma.brigada.create({
      data: dto,
    });
  }

  findAll() {
    return this.prisma.brigada.findMany();
  }

  findOne(id: number) {
    return this.prisma.brigada.findUnique({
      where: { id },
    });
  }

  update(id: number, dto: Partial<CreateBrigadaDto>) {
    return this.prisma.brigada.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.brigada.delete({
      where: { id },
    });
  }
}
