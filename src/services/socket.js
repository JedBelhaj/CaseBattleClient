import { io } from "socket.io-client";
import dotenv from "dotenv";

dotenv.config();
const socket = io(process.env.BACKEND | "http://localhost:3001");

export default socket;
