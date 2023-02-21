import axios from 'axios';

// const BASE_URL = 'http://127.0.0.1:3000';  // use this for local development
// use PI's IP for production
// const BASE_URL = 'https://10.0.0.215/api'
const BASE_URL = 'https://153.106.168.32/api'

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': ' application/json' },
});