import { IsNotEmpty, Length,IsString, Min } from 'class-validator';
import { ValidationMessages } from 'src/validation';
export class todoDTO {
   @IsString()
   @IsNotEmpty({
      message: ValidationMessages.nameRequired
    })
    @Length(3, 10, {
      message: ValidationMessages.nameLength
    })
   name:string;

   @IsString()
   @IsNotEmpty({
      message: ValidationMessages.descriptionRequired
    })
    @Min(10,{
      message: ValidationMessages.descriptionLength
    })
   description:string
}