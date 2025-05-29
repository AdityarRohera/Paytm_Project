import { Router } from "express";
const accountRouter = Router();
import { userAuth } from "../userAuth";

import { accountBalance , transferBalance } from "../Controllers/accountController";

accountRouter.get('/balance' , userAuth , accountBalance);
accountRouter.post('/transfer' , userAuth , transferBalance)

export default accountRouter;