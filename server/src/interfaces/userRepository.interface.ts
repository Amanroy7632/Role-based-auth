import User from "../models/user.model";
export type FindUser={
    users:{
        name:string;
        email:string,
        role:string;
        mobile?:string|null;
        profileImg?:string|null;
        isVerified?:boolean;
    }[];
    totalUsers:number;
}
export default interface IUserRepositoty {
  create(input: User): Promise<User>;
  update(id: number, input: User): Promise<User>;
  findOne(id: number): Promise<User>;
  find(limit: number, offset: number,search?:string): Promise<FindUser>;
  delete(id: number): Promise<User>;
}
