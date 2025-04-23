import socket from "./socket";

const socketOps = {
  joinRoom: (username, roomId) => {
    socket.emit("join_room", {
      username: username,
      roomId: roomId,
    });
  },
  createRoom: (username) => {},
};

export default socketOps;
