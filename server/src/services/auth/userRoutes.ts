import { Router } from 'express'
import { User } from './userModel'
import { registerNewUser, loginUser } from './userController'

const userRouter: Router = Router()

userRouter.post('/register', registerNewUser)
userRouter.post('/login', loginUser)

export { userRouter }
