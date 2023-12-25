import axios from 'axios';

const callApi = axios.create({
    baseURL: 'https://webby-server.onrender.com',
    // baseURL: 'https://webby-server.vercel.app',
})

export default callApi