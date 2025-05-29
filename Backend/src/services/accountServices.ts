import mongoose , {Types} from "mongoose"
import { accountModel } from "../Models/accountModel"


export const userAccount = async(userId : Types.ObjectId) => {
    // get user account balance
    const balance = await accountModel.findOne({userId})
    return balance;
}