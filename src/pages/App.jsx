import { useState } from "react";
import MainWindow from "../components/MainWindow";
import SideBar from "../components/SideBar";
import socket from "./socket";
import { useEffect } from "react";
import { useParams } from "react-router";
import RoomNotFound from "./RoomNotFound";
function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [roomFound, setRoomFound] = useState(false);
  const [solo, setSolo] = useState(true);
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    setPlayers(
      [...Array(5)].map((_, index) => {
        return { name: `Player${index}`, casesOpened: 200, profit: -200 };
      })
    );
  }, []);
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
    <div className="bg-zinc-900 w-screen h-screen flex ">
      {roomFound ? (
        <>
          <MainWindow gameStarted={gameStarted} solo={solo} />
          {!solo && <SideBar players={players} />}
        </>
      ) : (
        <RoomNotFound />
      )}
    </div>
  );
}

export default App;
