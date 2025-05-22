import { IUser } from "../interfaces/user.interface";
// import * as express from "express";
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
      role: string;
      // add any other properties your user has here
    }

    interface Request {
      user?: User; // `user` is optional on Request
    }
  }
}
