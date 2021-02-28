import axios from "axios";
import {baseUrl} from "./index";

export const getData = () => {
    return axios.get(`${baseUrl}/api/people/`)

}