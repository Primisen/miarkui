import axios from "axios";
import urls from "../urls";

export const postLike = async (reviewId: number) => {
    const response = await axios.post(urls.LIKES, {userId: localStorage.getItem('userId'), reviewId: reviewId})
    return response.data
}