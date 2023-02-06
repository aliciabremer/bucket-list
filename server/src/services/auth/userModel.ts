import mongoose, { AnyArray } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';


interface IUser {
  email: string;
  username: string;
  password: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  username: string;
  password: string;
  hashPassword: (password: string) => Promise<string>;
  compareUserPassword: (inputtedPassword: string, hashedPassword: string) => Promise<boolean>;
  generateJwtToken: (payload: object, secret : jwt.Secret, expires: jwt.SignOptions) => string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

userSchema.statics.build = (attr: IUser) => {
  return new User(attr)
}

userSchema.methods.hashPassword = async (password: string) => {
  return await bcrypt.hashSync(password, 10)
}

userSchema.methods.compareUserPassword = async (inputtedPassword: string, hashedPassword: string) => {
  return await bcrypt.compare(inputtedPassword, hashedPassword)
}

userSchema.methods.generateJwtToken = async (payload: object, secret : jwt.Secret, expires: jwt.SignOptions) => {
  return jwt.sign(payload, secret, expires)
}

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema)

User.build({
  email: 'some email',
  username: 'some username',
  password: 'some password'
})

export { User }

userSchema.plugin(uniqueValidator, {
  message: '{PATH} Already in use'
})
