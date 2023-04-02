import { Module } from '@nestjs/common';
import { PremierController } from './premier.controller';

@Module({
  imports: [PremierModule],
  controllers: [PremierController]
})
export class PremierModule {}
