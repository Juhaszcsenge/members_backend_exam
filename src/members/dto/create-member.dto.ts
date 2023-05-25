import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsOptional()
  @IsString()
  gender: string;
  @IsDateString()
  birth_date: Date;
}
