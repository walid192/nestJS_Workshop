import { Global, Module } from '@nestjs/common';
import { TodoService } from 'src/todo/todo.service';
import {v4 as uuidv4} from 'uuid';


@Global()
@Module({
  providers: [{
    provide: 'UUID',
    useValue: uuidv4
  },
    // TodoService    
],
  exports: ['UUID']
})
export class CommonModule {}