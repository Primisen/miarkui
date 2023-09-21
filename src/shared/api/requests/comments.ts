import {IComment} from "../../../models/comment";
import axios from "axios";
import urls from "../urls";

export const createComment = async (comment: IComment) => {
    const response = await axios.post(urls.COMMENTS, comment)
    return response.data;
}