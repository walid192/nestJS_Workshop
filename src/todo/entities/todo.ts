import { TodoStatusEnum } from "../todo-status.enum";
export  class Todo {

    id:number;
    name:string;
    description:string;
    createdAt:Date;
    status: TodoStatusEnum;
}

