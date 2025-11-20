import { Transform, Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class FindAllQueryDto{

  @IsOptional()
  @IsInt()
  @Type(()=> Number)
  catId?: number;

  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @IsString()
  cidade?: string;

  @IsOptional()
  @IsString()
  estado?: string;
}