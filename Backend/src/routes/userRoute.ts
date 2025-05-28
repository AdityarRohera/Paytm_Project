import {Router} from 'express';
const userRouter = Router();

// import all user routes here
import { userSignup , userSignin , updateUser , filterUser } from '../Controllers/userController';
import { userAuth } from '../userAuth';
userRouter.post('/signup' , userSignup);
userRouter.post('/signin' , userSignin);

// protected routes for user
userRouter.put('/update-profile' , userAuth , updateUser);
userRouter.get('/bulk/filter' , userAuth , filterUser);

export default userRouter;
