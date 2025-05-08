import { io } from "socket.io-client";

const socket = io(import.meta.env.BACKEND || "http://localhost:3001");

export default socket;
