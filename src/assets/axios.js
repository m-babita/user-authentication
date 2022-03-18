import axios from "axios";

export default axios.create({
    baseURL: 'https://user-auth-apii.herokuapp.com/api/v1'
})