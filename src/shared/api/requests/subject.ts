import axios from "axios";
import urls from "../urls";

const getAllSubjects = async () => {
    const response = await axios.get(urls.SUBJECTS)
    return response.data
}

export default getAllSubjects()