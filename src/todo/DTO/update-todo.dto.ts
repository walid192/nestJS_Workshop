import { IsEnum, IsOptional, IsString, Length, Min,  } from "class-validator";
import { ValidationMessages } from "src/validation";
import { TodoStatusEnum } from "../todo-status.enum";

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    @Length(3, 10, {
      message: ValidationMessages.nameLength
    })
    name?: string;
  
    @IsString()
    @IsOptional()
    @Min(10,{
      message: ValidationMessages.descriptionLength
    })
    description?: string;

  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}