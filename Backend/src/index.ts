import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'

const app = express();
const port: number =  Number(process.env.PORT) || 3000;
console.log(port);

// db connect
import dbConnect from './dbConnect';
dbConnect();

app.use(express.json());
app.use(cors(
  {
    origin : ' http://localhost:5173',
    optionsSuccessStatus: 200
  }
));

// Routes
import userRouter from './routes/userRoute';
import accountRouter from './routes/accountRoute';
app.use('/api/v1/user' , userRouter);
app.use('/api/v1/account' , accountRouter )

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

export default app;