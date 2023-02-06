import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import { userRouter } from './services/auth/userRoutes';
import { JwtPayload } from 'jsonwebtoken';


declare global {
  namespace Express {
    interface Request {
      userData: string | JwtPayload
    }
  }
}


const app = express()

// what the app uses
app.use(json())
app.use("/api/user", userRouter)
// app.use(todoRouter)


mongoose.connect('mongodb://localhost:27017/bucket-list', {}, () => {
  console.log('connected to database')
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})



