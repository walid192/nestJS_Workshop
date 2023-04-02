import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { todoDTO } from './DTO/add-todo.dto';
import { Todo } from './entities/todo';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { UpdateTodoDto } from './DTO/update-todo.dto';
import { TodoSearchParamsDto } from './DTO/TodoSearchParams.dto';



@Controller('todo')
export class TodoController {
    
    constructor( private todoService :TodoService){
    }


    @Get('stats')
    async statTodoNumberByStatus(){
        return this.todoService.statTodoNumberByStatus()
    }

    @Get()
    listerTodo(
    @Query() params:TodoSearchParamsDto
    ){
        return this.todoService.getAllTodos(params)
    }

    @Get('/:id')
    getTodoById(
        @Param('id',ParseIntPipe) id
    ){
        return this.todoService.getTodoById(id)
    }

    @Get('/:id')
    async getTodoById__V2( @Param('id',ParseIntPipe) id){
        return await  this.todoService.getTodoById__V2(id)
    }

    @Post()
    addTodo(
        @Body() newTodo:todoDTO
    ){
        this.todoService.addTodo(newTodo)
    }


    @Post()
    async addTodo__V2(@Body() newTodo:todoDTO){
        this.todoService.addTodo__V2(newTodo);
    }

    @Delete(':id')
    deleteTodo(
        @Param('id',ParseIntPipe)id
    ){
       this.todoService.deleteTodo(id)
    }

    @Delete(':id')
    async deleteTodo__V2(@Param('id',ParseIntPipe)id)
    {
        this.todoService.softRemove(id)
    }

    @Get()
    async recoverTodo(@Param('id',ParseIntPipe)id)
    {
        this.todoService.recoverTodo(id)
    }

    @Put(':id')
    modifierTodo(
        @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.BAD_REQUEST}))id,
        @Body() newTodo:Partial <todoDTO>
    ){
       this.todoService.updateTodo(+id,newTodo)
    }

    @Patch(':id')
    modifierTodo__V2( @Param('id',new ParseIntPipe({errorHttpStatusCode:HttpStatus.BAD_REQUEST}))id,
    @Body() newTodo: UpdateTodoDto)
    {
        this.todoService.updateTodo__V2(id,newTodo)
    }

}
