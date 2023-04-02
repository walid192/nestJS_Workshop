import { Injectable, NotFoundException } from '@nestjs/common';
import { todoDTO } from './DTO/add-todo.dto';
import { Todo } from './entities/todo';
import { TodoStatusEnum } from './todo-status.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './DTO/update-todo.dto';

@Injectable()
export class TodoService {

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}


  todos: Todo[]=[];

  getTodos(): Todo[] {
    return this.todos;
  }

  async getAllTodos(params) {
    const qb = this.todoRepository.createQueryBuilder('todo');

    if (params?.name) {
      qb.andWhere('LOWER(todo.name) LIKE LOWER(:name)', { name: `%${params.name}%` });
    }
    if (params?.description) {
      qb.andWhere('LOWER(todo.description) LIKE LOWER(:description)', { description: `%${params.description}%` });
    }

    const todos = await qb.getMany();
    return todos;
  }

  //Paginated getAll function 
  async getAll(page = 1, perPage = 5){
    const [todos, total] = await this.todoRepository.findAndCount({
      take: perPage,
      skip: (page - 1) * perPage,
    });

    const pagination = {
      currentPage: page,
      perPage,
      totalItems: total,
      totalPages: Math.ceil(total / perPage),
    };
    return {
      items: todos,
      pagination,
    };
  }



  addTodo(newTodo: todoDTO) {
    const { name, description } = newTodo;
    let id;
    if (this.todos.length) {
      id = this.todos[this.todos.length - 1].id + 1;
    } else {
      id = 1;
    }
    this.todos.push( {
      name,
      description,
      id,
      createdAt: new Date(),
      status:TodoStatusEnum.waiting
    });
  }

  async addTodo__V2(newTodo: todoDTO){
    await this.todoRepository.save(newTodo)
  }

  getTodoById(id:number):Todo{
    const todo=this.todos.find((t)=>t.id===+id)
        if (todo) {
            return(todo)
        } else {
            throw new NotFoundException (`le todo d'id ${id} n'existe pas`);
            
        }
  }


  async getTodoById__V2(id:number):Promise<TodoEntity>
  {
    const todo = await this.todoRepository.findOneBy({id});
    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  deleteTodo(id:number){
    const todoIndex=this.todos.findIndex((t)=>{t.id===+id})
    if (todoIndex) {
        this.todos.splice(todoIndex,1)
        return ("todo supprime")
    } else {
        throw new NotFoundException (`le todo d'id ${id} n'existe pas`);
    }
   
  }

  async removeTodo__V2(id:number){
    const todoToRemove=await this.todoRepository.findOneBy({id});
    if(!todoToRemove){
      throw new NotFoundException(`le todo d'id {$id} n'existe pas`)
    }
    return await this.todoRepository.remove(todoToRemove)

  }

  async softRemove(id:number){
    const todoToRemove=await this.todoRepository.findOneBy({id});
    if(!todoToRemove){
      throw new NotFoundException(`le todo d'id {$id} n'existe pas`)
    }
    return await this.todoRepository.softRemove(todoToRemove)

  }

  async recoverTodo(id:number){
    const todoToRecover=await this.todoRepository.findOneBy({id});
    if(!todoToRecover){
      throw new NotFoundException(`le todo d'id {$id} n'existe pas`)
    }
    return await this.todoRepository.recover(todoToRecover)
  }


  updateTodo(id:number,newTodo:Partial<todoDTO>){
    const todo=this.todos.find(t=>t.id===+id)
    todo.description=newTodo.description? newTodo.description :todo.description
    todo.name=newTodo.name? newTodo.name :todo.name
    return ("todo modified")
  }

  async updateTodo__V2(id:number,todo: UpdateTodoDto){
     const newTodo=await this.todoRepository.preload({
      id,
      ...todo
    })
    if(!newTodo){
      throw new NotFoundException(`le todo d'id {$id} n'existe pas`)
    }
    await this.todoRepository.save(newTodo)
  }


  async statTodoNumberByStatus(){
    const qb=this.todoRepository.createQueryBuilder("TodoEntity")
    return await qb.select("TodoEntity.status,count(TodoEntity.id) as nbreTodo").groupBy("TodoEntity.status").getRawMany()
  }


}
