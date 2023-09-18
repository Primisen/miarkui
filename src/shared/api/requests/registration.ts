import axios from "axios";
import {IUser} from "../../../models/user";
import urls from "../urls";

const registration = async (user: IUser) => {
    const response = await axios.post<IUser>(urls.REGISTRATION, user)
    return response.data;
}

export default registration;
