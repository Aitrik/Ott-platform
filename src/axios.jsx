import axios from "axios";

const axiosInstance=axios.create({
    baseURL:"http://api.themoviedb.org/3",
})

export default axiosInstance;