export interface IComment {
    id?: string
    text: string
    reviewId: number
    user: {
        id?: number
        username?: string
    }
}