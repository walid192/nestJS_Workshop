import { Controller,Get,Post,Put,Patch,Delete } from '@nestjs/common';

@Controller('premier')
export class PremierController {
    @Get()
  get(): string {
    console.log('GET method called');
    return 'GET method called';
  }

  @Post()
  post(): string {
    console.log('POST method called');
    return 'POST method called';
  }

  @Delete()
  delete(): string {
    console.log('DELETE method called');
    return 'DELETE method called';
  }

  @Put()
  put(): string {
    console.log('PUT method called');
    return 'PUT method called';
  }

  @Patch()
  patch(): string {
    console.log('PATCH method called');
    return 'PATCH method called';
  }
}
