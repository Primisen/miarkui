import axios from "axios";
import {IUser} from "../../../models/user";
import urls from "../urls";

export const login = async (user: IUser) => {
    const response = await axios.post(urls.LOGIN, user)
    return response.data
}