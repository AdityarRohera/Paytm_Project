import { NextFunction, Request , Response , RequestHandler  } from "express";
import jwt , {JwtPayload } from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

 export interface AuthenticatedRequest extends Request {
        userId : string
  }

export const userAuth : RequestHandler  = async(req:Request , res:Response ,next:NextFunction) : Promise<void> => {
    try{
        const userReq = req as AuthenticatedRequest;
        const {token} = req.headers;

        if(!token || typeof token!== "string"){
            res.status(409).send({
                status: "fail",
                message: "token missing"
            })
            return;
        }

        // token found now verify token
        const tokenVerification = await jwt.verify(token , secret!) as JwtPayload ;

        if(!tokenVerification){
            res.status(403).send({
                status: "fail",
                message: "Token invalid"
            })
            return;
        }

        // token verified
        userReq.userId = tokenVerification.userId;
        next();

    }catch(e:unknown){
        let errorMessage;

        if(e instanceof Error){
            errorMessage = e.message;
        } else if( typeof e === 'string'){
            errorMessage = e
        }

        res.status(501).send({
            status : "fail",
            message : "error in creating token",
            error : errorMessage
        })
      }
}