import {ICategory} from "./category";

export interface ISubject {
    id?: number
    name: string
    rating: number
    category: ICategory
}