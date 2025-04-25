import socket from "./socket";

const socketHandler = {
  handleJoinRoom: (username, roomId) => {
    let returnUsername = "";
    if (username !== "") {
      socket.emit("join_room", username, roomId, (newUsername) => {
        returnUsername = newUsername;
      });
    }
    return returnUsername;
  },
  createRoom: (username) => {},
};

export default socketHandler;
