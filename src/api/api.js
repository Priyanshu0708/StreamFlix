import axios from "axios";

const URL = "https://api.themoviedb.org/3";
const API_KEY = "1c517865c13b7b3f3cd3ff10dc3688b9";


const endpoints = {
    originals: "/discover/tv",
    trending: "/trending/all/week",
    now_playing: "/movie/now_playing",
    popular: "/movie/popular",
    top_rated: "/movie/top_rated",
    upcoming: "/movie/upcoming",
};

export const fetchdata = (param) => {
    return axios.get(`${URL}${endpoints[param]}?api_key=${API_KEY}`)
}


