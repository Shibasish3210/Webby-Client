import axios from 'axios';

const callApi = axios.create({
    // baseURL: 'http://localhost:3333',
    baseURL: 'https://webby-server.onrender.com',
    // baseURL: 'https://webby-server.vercel.app',
})

export default callApi