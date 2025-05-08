import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND;
console.log(backendURL);

const socket = io(backendURL);
console.log(socket);

export default socket;
