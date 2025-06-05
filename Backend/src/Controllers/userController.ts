import { Request , Response } from "express";
import { createUser , findUser , findUsers , createBalance , getAllUsers } from "../services/userServices";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from "../userAuth";
import { userModel } from "../Models/userModel";
import mongoose , {Schema} from "mongoose";
const secret = process.env.JWT_SECRET;

export const userSignup = async(req: Request , res : Response) => {
    try{

        const {firstName , lastName , email , password} = req.body;
        
        // first check user already exists or not 
        const checkUser = await findUser(email);
        if(checkUser){
            res.status(409).send({
                status: "fail",
                message : "user already exists"
            })
            return;
        }
    
        // create new user
        const newUser = await createUser({firstName ,lastName , email , password});

        if (newUser){
            // now create random balance for user
            await createBalance(newUser._id);

            res.status(200).send({
                status : "success",
                message : "user created"
            })
        }

    } catch(err : unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }

        res.send({
            status : " fail",
            message : errMessage
        })
    }
}

export const userSignin = async(req: Request , res : Response) => {
    try{

        const {email , password} = req.body;
        const checkUser = await findUser(email);
        if (!checkUser){
            res.status(200).send({
                status : "fail",
                message : "signup first"
            })
            return;
        }

        // user found check for password
        const checkPassword = await bcrypt.compare(password , checkUser.password);
        if(!checkPassword){
            res.status(409).send({
                status : "fail",
                message : "password incorrect"
            })
            return
        }

        // now password is correct create token
        
        const token = secret ? jwt.sign({
            userId : checkUser._id 
        } , secret) : null

        res.status(200).send({
            status : "success",
            token : token
        })

    } catch(err : unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }

        res.send({
            status : " fail",
            message : errMessage
        })
    }
}

export const updateUser = async(req: Request , res : Response) => {
    try{

        const userReq = req as AuthenticatedRequest;
        const userId = userReq.userId;
        const {firstName , lastName , email , password} = req.body;

        // now update user profile
        const updateUser = await userModel.findByIdAndUpdate(userId , {firstName , lastName , email , password} , { new: true })

        if(updateUser){
            res.status(200).send({
                message : "profile updated successfully"
            })
        }

    } catch(err : unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }

        res.send({
            status : " fail",
            message : errMessage
        })
    }
}

export const filterUser = async(req: Request , res: Response) => {
    try{

        const name = req.query.name;
        console.log(name);
        

        // find users based on filter data
        if (typeof name !== 'string') {
            res.status(400).json({ message: "Name must be a string" });
            return;
        }
        
        const users = await findUsers(name);
        if(!users){
             res.status(200).send({
                message : "user not found"
            })
            return;
        } 

        res.status(200).send({
            status : "success",
            users : users
        })

    }catch(err : unknown){
         let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }

        res.send({
            status : " fail",
            message : errMessage
        })
    }
}

export const allUsers = async(req: Request , res: Response) => {
    try{
         const userReq = req as AuthenticatedRequest;
         const userId = new mongoose.Types.ObjectId(userReq.userId);

         // get all users
         const allUsers = await getAllUsers();
         console.log(allUsers);

        //  now filter it 
        const newAllUsers = allUsers.filter(user => {
            console.log(user._id , "and user is" , userId);
            return user._id.toString() !== userId.toString();
        });
        
        res.status(200).send({
            status : "true",
            users : newAllUsers
        })

    }catch(err : unknown){
         let errMessage;
        if(err instanceof Error){
            errMessage = err.message
        } else{
            errMessage = err
        }

        res.send({
            status : " fail",
            message : errMessage
        })
    }
}