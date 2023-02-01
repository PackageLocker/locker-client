import axios from 'axios';

export default axios.create({
    // use this for local development
    baseURL: 'http://127.0.0.1:3000'

    // use PI's IP for production
    // baseURL: 'https://10.0.0.215/api'
});