import { User } from './userModel'
import { Request, Response } from 'express'
import { RequiredPaths } from 'mongoose/types/inferschematype'

const registerNewUser = async (req: Request, res: Response) => {
  try {
    var user = User.build({
      email: req.body.email,
      username: req.body.username,
      password: ''
    })
    user.password = await user.hashPassword(req.body.password)
    var createdUser = await user.save()
    res.status(200).json({
      msg: "New user created",
      data: createdUser
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

const loginUser = async (req: Request, res: Response) => {
  const login = {
    email: req.body.email,
    password: req.body.password
  }
  try {
    const user = await User.findOne({
      email: login.email
    })
    if (!user) {
      res.status(400).json({
        type: "Not found",
        msg: "Wrong login details"
      })
      return
    }
    const match = await user.compareUserPassword(login.password, user.password)
    if (match) {
      const token = await user.generateJwtToken(
        {user},
        "secret", // change to secret from file
        {expiresIn: 604800}
      )
    }
    else {
      res.status(400).json({
        type: "Not found",
        msg: "Wrong login details"
      })
      return
    }
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

export {
  registerNewUser,
  loginUser
}
