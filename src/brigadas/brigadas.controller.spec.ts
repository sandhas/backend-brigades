import { Test, TestingModule } from '@nestjs/testing';
import { BrigadasController } from './brigadas.controller';
import { BrigadasService } from './brigadas.service';
import { PrismaClient } from '@prisma/client';

const prismaMock = {
  brigada: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('BrigadasController', () => {
  let controller: BrigadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadasController],
      providers: [
        BrigadasService,
        { provide: PrismaClient, useValue: prismaMock },
      ],
    }).compile();

    controller = module.get<BrigadasController>(BrigadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
