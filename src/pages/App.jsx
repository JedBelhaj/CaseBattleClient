import { useState } from "react";
import MainWindow from "../components/MainWindow";
import SideBar from "../components/SideBar";
import socket from "./socket";
import { useEffect } from "react";
import { useParams } from "react-router";
import RoomNotFound from "./RoomNotFound";
function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [roomFound, setRoomFound] = useState(false);
  const [solo, setSolo] = useState(true);
  const { roomId } = useParams();
  useEffect(() => {
    if (roomId === "_solo") {
      setRoomFound(true);
      return;
    }
    setSolo(false);
    socket.emit("room_exist", roomId, (exists) => {
      setRoomFound(exists);
    });

    if (roomFound) {
      socket.emit("join_room", roomId);
    }

    return () => {
      socket.off("room_exist"); // Clean up the listener
    };
  }, [roomId]);
  return (
    <div className="bg-zinc-900 min-h-screen w-screen flex ">
      {roomFound ? (
        <>
          <MainWindow gameStarted={gameStarted} solo={solo} />
          <SideBar />
        </>
      ) : (
        <RoomNotFound />
      )}
    </div>
  );
}

export default App;
