import { io } from "socket.io-client";

const backendURL = import.meta.env.VITE_BACKEND;
console.log("Backend URL:", backendURL);

const socket = io(backendURL, {
  autoConnect: true,
  timeout: 5000,
  retries: 3,
});

socket.on("connect", () => {
  console.log("✅ Connected to backend server");
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected from backend server");
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error.message);
});

console.log("Socket instance:", socket);

export default socket;
