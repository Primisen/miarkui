import {IComment} from "./comment";
import {ISubject} from "./subject";
import {ITag} from "./tag";
import {ILikes} from "./likes";
import {IUser} from "./user";

export interface IReview {
    id?: number
    title: string
    text: string
    coverImageUrl: string
    subject: ISubject
    tags: ITag[]
    userId: number//
    user?: IUser
    comments?: IComment[]
    likes?: ILikes[]
}
