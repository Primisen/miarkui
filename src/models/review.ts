import {IComment} from "./comment";
import {ISubject} from "./subject";

export interface IReview {
    id?: number
    title: string
    text: string
    coverImageUrl: string
    subject: ISubject
    // tags: string []
    tags: {name: string}[]
    userId: number
    comments?: [IComment]
}