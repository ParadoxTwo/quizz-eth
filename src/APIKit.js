import axios from 'axios';
let APIKit = axios.create({
    baseURL: 'http://localhost:6000',
    timeout: 10000,
});

export default APIKit;