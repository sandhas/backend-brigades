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

  async update(id: number, dto: Partial<CreateBrigadaDto>) {
    try {
      return await this.prisma.brigada.update({
        where: { id },
        data: dto,
      });
    } catch (e: any) {
      if (e.code === 'P2025') return null;
      throw e;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.brigada.delete({
        where: { id },
      });
    } catch (e: any) {
      if (e.code === 'P2025') return null;
      throw e;
    }
  }
}
