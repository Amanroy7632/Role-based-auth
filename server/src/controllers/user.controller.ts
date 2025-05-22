import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { ApiError, ApiResponse, filterQuery, RequestValidator } from "../utils";
import { CreateUserRequest, UpdateUserRequest } from "../dto/user.dto";
import {redis,scanAndDeleteKeys} from "../config/redis"
export default  class UserController{
    constructor(private userService:UserService){
        this.userService=userService;
        this.createUser=this.createUser.bind(this);
        this.updateUser=this.updateUser.bind(this);
        this.getUsers=this.getUsers.bind(this);
        this.getUserById=this.getUserById.bind(this);
        this.deleteUser=this.deleteUser.bind(this);
    }
    async createUser(req:Request,res:Response,next:NextFunction):Promise<any>{
       try {
        const input = req.body;
        const errors =await RequestValidator(CreateUserRequest,req.body);
        if (errors.errors) {
            return next(new ApiError(400,errors.errors.toString()));
        }
        const user = await this.userService.createUser(input);
        if (user) {
            await scanAndDeleteKeys(`USERS:CACHED:page*`);
        }
        return res.status(201).json(new ApiResponse(201,user,"User created succssfully."));
       } catch (error) {
        next(error);
       }
    }
    async updateUser(req:Request,res:Response,next:NextFunction):Promise<any>{
       try {
        const {id} = req.params;
        const uId = parseInt(id,10);
        if (!uId) {
            return next(new ApiError(400,"Invalid User id."));
        }
        const errors =await RequestValidator(UpdateUserRequest,req.body);
        if (errors.errors) {
            return next(new ApiError(400,errors.errors.toString()));
        }
        const user = await this.userService.updateUser(uId,req.body);
        return res.status(200).json(new ApiResponse(200,user,"User updated succssfully."));
       } catch (error) {
        next(error);
       }
    }
    async getUsers(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const {page=1,limit=10} =req.query;
            const {pageLimit,currentPage,offset} = filterQuery.getPaginatedValue(page,limit);
            const cachedKey = `USERS:CACHED:page:${currentPage}:limit:${pageLimit}`;
            const cachedData = await redis.get(cachedKey);
            if (cachedData) {
                return res.status(200).json(new ApiResponse(200,JSON.parse(cachedData)));
            }
            const {users,totalUsers} = await this.userService.getUsers(pageLimit,offset);
            const responseData={
                users,
                metaData:{
                    currentPage,
                    pageLimit,
                    totalPages:Math.ceil(totalUsers/pageLimit)
                }
            }
            if (totalUsers) {
                await redis.set(cachedKey,JSON.stringify(responseData),"EX",2*60);//cached for 2 min
            }
            return res.status(200).json(new ApiResponse(200,responseData,"OK"));
        } catch (error) {
            next(error);
        }
    }
    async getUserById(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
            const {id} =req.params;
            const uid= parseInt(id,10);
            const cachedKey = `USERS:CACHED:page:userid${uid}`;
            const cachedData = await redis.get(cachedKey);
            if (cachedData) {
                return res.status(200).json(new ApiResponse(200,JSON.parse(cachedData)));
            }
            const user = await this.userService.getUserById(uid);
            
            if (user) {
                await redis.set(cachedKey,JSON.stringify(user),"EX",60);//cache dfor 1 min
            }
            return res.status(200).json(new ApiResponse(200,user,"OK"));
        } catch (error) {
            next(error);
        }
    }
    async deleteUser(req:Request,res:Response,next:NextFunction):Promise<any>{
        try {
           const {id} =req.params;
            const uid= parseInt(id,10);
            const cachedKey = `USERS:CACHED:page:userid${uid}`;
            const user = await this.userService.deleteUser(uid);
            if (user) {
                redis.del(cachedKey);
            }
            return res.status(200).json(new ApiResponse(200,user,"User deleted successfully."));
        } catch (error) {
            next(error);
        }
    }
}   