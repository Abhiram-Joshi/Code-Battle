import io from "socket.io-client";
const ENDPOINT = 'http://f14d-2401-4900-1c00-5b7-c8d0-5480-8ab8-8d91.ngrok.io/';
export default io(ENDPOINT);