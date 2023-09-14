import axios from "axios";
import urls from "../urls";

export const search = async (searchExpression: string) => {
    const response = await axios.get(urls.SEARCH + '?searchExpression=' + searchExpression)
    return response.data
}