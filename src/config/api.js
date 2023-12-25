import axios from 'axios';

const callApi = axios.create({
    baseURL: 'http://localhost:3333',
})

export default callApi