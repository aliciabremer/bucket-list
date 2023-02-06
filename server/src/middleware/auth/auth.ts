import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const middleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.replace("Bearer", "") ?? ""
    console.log(token)
    const decoded = jwt.verify(token, "secret")
    req.userData = decoded
    next()
  }
  catch (err) {
    return res.status(401).json({
      msg: "Authentication Failed"
    })
  }
}
