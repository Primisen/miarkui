import axios from "axios";
import urls from "../urls";

const getAllCategories = async () => {
    const response = await axios.get(urls.CATEGORIES)
    return response.data

}

export default getAllCategories()