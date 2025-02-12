import { IUser } from './user.interface'

export interface IComment {
  _id: string,
  text: string,
  parent: Comment | null,
  user: IUser,
  createdAt: string
}

export interface ICommentTextForm {
  text: string,
}

export interface ICommentForm extends ICommentTextForm {
  parentId?: string | null,
  userId?: string
}
