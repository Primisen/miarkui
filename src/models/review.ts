import {IComment} from "./comment";
import {ISubject} from "./subject";
import {ITag} from "./tag";
import {ILikes} from "./likes";

export interface IReview {
    id?: number
    title: string
    text: string
    coverImageUrl: string
    subject: ISubject
    tags: ITag[]
    userId: number
    comments?: IComment[]
    likes?: ILikes[]
}
