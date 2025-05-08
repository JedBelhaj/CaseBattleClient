import socket from "./socket";

const socketHandler = {
  joinRoom: (username, roomId) => {
    console.log(username, "joining ", roomId);

    if (username !== "") {
      socket.emit("join_room", username, roomId, (newUsername) => {
        if (newUsername) {
          console.log("NEW USERNAME :", newUsername);

          localStorage.setItem("username", newUsername);
        }
      });
    }
  },
  createRoom: (username) => {},
};

export default socketHandler;
