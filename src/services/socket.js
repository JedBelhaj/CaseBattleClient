import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND;

const socket = io(backendURL);

export default socket;
