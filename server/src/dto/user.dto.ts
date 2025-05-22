import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUBADMIN = "SUBADMIN",
}
export class CreateUserRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
  @IsNotEmpty()
  password: string;
  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, {
    message: "Mobile number must be exactly 10 digits",
  })
  mobile: string;
  @IsOptional()
  @IsString()
  profileImg: string;
}

export class UpdateUserRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @IsOptional()
  @IsString()
  profileImg?: string;

  @IsOptional()
  @Matches(/^\d{10}$/, {
    message: "Mobile number must be exactly 10 digits",
  })
  mobile?: string;
}
