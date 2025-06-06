import { Test, TestingModule } from '@nestjs/testing';
import { BrigadasController } from './brigadas.controller';
import { BrigadasService } from './brigadas.service';

describe('BrigadasController', () => {
  let controller: BrigadasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrigadasController],
      providers: [BrigadasService],
    }).compile();

    controller = module.get<BrigadasController>(BrigadasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
