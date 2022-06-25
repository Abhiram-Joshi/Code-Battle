import axios from "axios"

const instance = axios.create({
    baseURL: 'http://cea2-2401-4900-1c00-5b7-a53f-5f14-f559-f946.ngrok.io/',
});

export default instance