import { IsOptional, IsString } from "class-validator";

export class FindAllQueryDto{
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