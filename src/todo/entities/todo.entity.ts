import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TodoStatusEnum } from "../todo-status.enum";
import { TimestampEntities } from "src/generics/timestamp.entity";

@Entity('todo')
export class TodoEntity  extends TimestampEntities{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column({ type: 'enum', enum: TodoStatusEnum, default: TodoStatusEnum.waiting})
    status: TodoStatusEnum;
}