import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port: number =  Number(process.env.PORT) || 3000;
console.log(port);

// db connect
import dbConnect from './dbConnect';
dbConnect();

app.use(express.json());

// Routes
import userRouter from './routes/userRoute';
app.use('/api/v1/user' , userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

export default app;