import {Router} from 'express';
const userRouter = Router();

// import all user routes here
import { userSignup , userSignin , updateUser , filterUser , allUsers , findUserAndAccount } from '../Controllers/userController';
import { userAuth } from '../userAuth';
userRouter.post('/signup' , userSignup);
userRouter.post('/signin' , userSignin);

// protected routes for user
userRouter.put('/update-profile' , userAuth , updateUser);
userRouter.get('/bulk/filter' , userAuth , filterUser);
userRouter.get('/bulk' , userAuth , allUsers);
userRouter.get('/me' , userAuth , findUserAndAccount);

export default userRouter;
