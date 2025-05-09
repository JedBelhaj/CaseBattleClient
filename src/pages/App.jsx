import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import MainWindow from "../components/MainWindow";
import SideBar from "../components/SideBar";
import RoomNotFound from "./RoomNotFound";
import socket from "../services/socket";
import Alert from "../components/Alert";
import ButtonPr from "../components/ButtonPr";

function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [roomFound, setRoomFound] = useState(false);
  const [solo, setSolo] = useState(false);
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );
  const { roomId } = useParams();

  function ChooseUser() {
    const userRef = useRef(null);
    return (
      <div className="h-full w-full flex items-center justify-center flex-col">
        <p className="text-yellow-500">Choose a Username to enter the room</p>
        <input
          placeholder="ShadawStyleSmpl"
          type="text"
          maxLength={14}
          minLength={3}
          ref={userRef}
          className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
        />
        <ButtonPr
          value={"Join Room"}
          action={() => {
            const usernameValue = userRef.current.value;

            if (usernameValue === "") {
              console.log("this shouldn't happen");
            } else {
              setUsername(usernameValue);

              console.log("NEW USERNAME :", usernameValue);

              localStorage.setItem("username", usernameValue);
              socket.emit("join_room", {
                username: usernameValue,
                roomId,
              });
            }
          }}
        />
      </div>
    );
  }

  useEffect(() => {
    if (roomId === "_solo") {
      setSolo(true);
      setRoomFound(true);
      return;
    }

    setSolo(false);

    socket.emit("room_exist", roomId, (exists) => {
      setRoomFound(exists);
    });

    if (roomFound && username) {
      socket.emit("in_room", username, roomId, (inRoom) => {
        if (!inRoom) {
          console.log("joining room");
          socket.emit("join_room", {
            username,
            roomId,
          });
        }
      });

      socket.on("update_users", (updatedPlayers) => {
        setPlayers(updatedPlayers);
        console.log("Updated Players: ", updatedPlayers);
      });

      socket.emit("req_update_users", roomId);

      return () => {
        socket.off("update_users");
      };
    }
  }, [roomId, roomFound, username]);

  console.log("Players : ", players);

  return (
    <div className="bg-zinc-900 w-screen h-screen flex">
      {roomFound || solo ? (
        <>
          {!username && <Alert content={<ChooseUser />} />}
          <MainWindow gameStarted={gameStarted} solo={solo} roomId={roomId} />
          {!solo && <SideBar players={players} />}
        </>
      ) : (
        <RoomNotFound />
      )}
    </div>
  );
}

export default App;
