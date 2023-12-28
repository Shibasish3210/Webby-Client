import axios from 'axios';
import Cookies from 'js-cookie';

const callApi = axios.create({
    // baseURL: 'http://localhost:3333',
    // baseURL: 'https://webby-server.onrender.com',
    baseURL: 'https://webby-server.vercel.app',
})

export default callApi