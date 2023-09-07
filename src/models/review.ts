import {IComment} from "./comment";

export interface IReview {
    id?: number
    title: string
    text: string
    coverImageUrl: string
    subject: {
        id?: number
        name: string,
        category: {
            id?: number
            name: string
        }
    },
    tags: string []
    userId: number
    comments?: [
        IComment
    ]
}