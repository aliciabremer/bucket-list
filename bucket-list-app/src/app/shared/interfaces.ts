export interface IUser {
  email: string,
  username: string,
  password: string
}

export interface IItem {
  _id: string,
  text: string,
  complete: boolean,
  user: string,
  originalUser: string
}
