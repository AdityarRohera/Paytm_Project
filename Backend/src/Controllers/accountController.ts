import { Request , Response } from "express";
import { AuthenticatedRequest } from "../userAuth";
import { userAccount } from "../services/accountServices";
import mongoose , {Types} from "mongoose";

export const accountBalance = async(req : Request , res: Response) => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const userId = new Types.ObjectId(userReq.userId);

          const getBalance = await userAccount(userId);

          if(getBalance){
            res.status(200).send({
                status : "success",
                balance : getBalance.balance
            }) 
          }

    } catch(err : unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message;
        } else{
            errMessage = err;
        }
    }
}

export const transferBalance = async(req : Request , res: Response) => {
    try{
        
        const userReq = req as AuthenticatedRequest;
        const userId = new Types.ObjectId(userReq.userId);
        const {receiveId , amount} = req.body;
        console.log(receiveId , typeof(receiveId));
        const recieveUserId = new Types.ObjectId(receiveId);
        console.log(recieveUserId);

        // first check for user balance
        const transferUser = await userAccount(userId);
        console.log(transferUser);

        if (!transferUser) {
        throw new Error("Transfer user not found");
        }

            // insufficent balance of user
            if(transferUser.balance < amount){
                res.status(400).send({
                    message: "Insufficient balance"
                })
                return;
            }

            // balance is sufficient now find recieving amount user
            const recievingUser = await userAccount(recieveUserId);
            console.log(recievingUser);
            if(!recievingUser){
                res.status(400).send({
                    message : "Invalid account"
                })
                return;
            }


        transferUser.balance -= amount;
        const result = await transferUser.save();
        console.log(result);

        if(!result){
            transferUser.balance += amount;
            res.send({
                message : "error in deducting money from user's account"
            })
            return;
        }

           // deducted from users account now receiving process
           recievingUser.balance += amount;
           const receivedAmount =  await recievingUser.save();
           
           // for testing purpose
           // const receivedAmount = null;

           if(!receivedAmount){
               // fail roll-back user amount
                recievingUser.balance -= amount;
                transferUser.balance += amount;
                await transferUser.save();
                res.status(500).send({
                    message : "Error in transfer money"
                })
                return;
           }

            // every thing is fine now send success message
                res.status(200).send({
                    message: "Transfer successful"
                })

    } catch(err : unknown){
        let errMessage;
        if(err instanceof Error){
            errMessage = err.message;
        } else{
            errMessage = err;
        }
    }
}