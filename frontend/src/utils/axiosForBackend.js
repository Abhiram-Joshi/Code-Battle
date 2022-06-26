import axios from "axios"

const instance = axios.create({
    baseURL: 'http://f14d-2401-4900-1c00-5b7-c8d0-5480-8ab8-8d91.ngrok.io/',
});

export default instance