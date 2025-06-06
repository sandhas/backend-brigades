import { Test, TestingModule } from '@nestjs/testing';
import { BrigadasService } from './brigadas.service';
import { PrismaClient } from '@prisma/client';
import { CreateBrigadaDto } from './dto/create-brigada.dto';

const mockBrigada = {
  id: 1,
  nome: 'Brigada 1',
  criadoEm: new Date(),
};

const prismaMock = {
  brigada: {
    create: jest.fn().mockResolvedValue(mockBrigada),
    findMany: jest.fn().mockResolvedValue([mockBrigada]),
    findUnique: jest.fn().mockResolvedValue(mockBrigada),
    update: jest.fn().mockResolvedValue({ ...mockBrigada, nome: 'Brigada Atualizada' }),
    delete: jest.fn().mockResolvedValue(mockBrigada),
  },
};

describe('BrigadasService', () => {
  let service: BrigadasService;
  let prisma: PrismaClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrigadasService,
        {
          provide: PrismaClient,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<BrigadasService>(BrigadasService);
    prisma = module.get<PrismaClient>(PrismaClient);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a brigada', async () => {
    const dto: CreateBrigadaDto = { nome: 'Brigada 1' } as any;
    const result = await service.create(dto);
    expect(prisma.brigada.create).toHaveBeenCalledWith({ data: dto });
    expect(result).toEqual(mockBrigada);
  });

  it('should return all brigadas', async () => {
    const all = await service.findAll();
    expect(prisma.brigada.findMany).toHaveBeenCalled();
    expect(all).toEqual([mockBrigada]);
  });

  it('should find one brigada by id', async () => {
    const found = await service.findOne(1);
    expect(prisma.brigada.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(found).toEqual(mockBrigada);
  });

  it('should return null if brigada not found', async () => {
    (prisma.brigada.findUnique as jest.Mock).mockResolvedValueOnce(null);
    const found = await service.findOne(999);
    expect(found).toBeNull();
  });

  it('should update a brigada', async () => {
    const updated = await service.update(1, { nome: 'Brigada Atualizada' });
    expect(prisma.brigada.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { nome: 'Brigada Atualizada' },
    });
    expect(updated && updated.nome).toBe('Brigada Atualizada');
  });

  it('should return null when updating non-existent brigada', async () => {
    (prisma.brigada.update as jest.Mock).mockRejectedValueOnce({ code: 'P2025' });
    const updated = await service.update(999, { nome: 'Teste' });
    expect(updated).toBeNull();
  });

  it('should remove a brigada', async () => {
    const removed = await service.remove(1);
    expect(prisma.brigada.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(removed).toEqual(mockBrigada);
  });

  it('should return null when removing non-existent brigada', async () => {
    (prisma.brigada.delete as jest.Mock).mockRejectedValueOnce({ code: 'P2025' });
    const removed = await service.remove(999);
    expect(removed).toBeNull();
  });
});
