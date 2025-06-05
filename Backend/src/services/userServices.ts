import mongoose , {Schema , Types} from "mongoose";
import { accountModel } from "../Models/accountModel";
import { userModel } from "../Models/userModel"
import bcrypt from 'bcrypt'
const saltRound = 10

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string; 
}

export const createUser = async({firstName , lastName , email , password}: CreateUserInput) => {

    // first hash password
    const hashPassword : string = await bcrypt.hash(password , saltRound);

    // create new user
    if(hashPassword){
        const createUser = await userModel.create({firstName , lastName , email , password:hashPassword});
        return createUser;
    }
}

export const findUser = async(email : string) => {
    // login user logic
     const findUser = await userModel.findOne({email});
     return findUser;
}

export const findUsers = async(name : string) => {
    // find all users based on filter 
    // let users = await userModel.find({firstName: name});
    // if(!users) users = await userModel.find({lastName: name});
    // return users;

    let users = await userModel.find({$or: [ { firstName: name}, { lastName : name } ]});
    return users
}

export const createBalance = async(userId : Types.ObjectId) => {
    const balance = 1 + (Math.random() * 10000);
    const createBal = await accountModel.create({userId , balance});
    return createBal;
}

export const getAllUsers = async() => {
    const allUsers = await userModel.find({});
    return allUsers;
}
