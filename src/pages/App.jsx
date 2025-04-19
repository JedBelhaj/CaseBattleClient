import { useState } from "react";
import MainWindow from "../components/MainWindow";
import SideBar from "../components/SideBar";
import socket from "../services/socket";
import { useEffect } from "react";
import { useParams } from "react-router";
import RoomNotFound from "./RoomNotFound";
function App() {
  const [gameStarted, setGameStarted] = useState(true);
  const [roomFound, setRoomFound] = useState(false);
  const [solo, setSolo] = useState(true);
  const [players, setPlayers] = useState([]);
  // useEffect(() => {
  //   setPlayers(
  //     [...Array(5)].map((_, index) => {
  //       return { name: `Player${index}`, casesOpened: 200, profit: -200 };
  //     })
  //   );
  // }, []);
  const { roomId } = useParams();
  useEffect(() => {
    if (roomId === "_solo") {
      setRoomFound(true);
      return;
    }
    setSolo(false);

    socket.on("update_users", (updatedPlayers) => {
      setPlayers(updatedPlayers);
      console.log("Updated Players: ", updatedPlayers);
    });

    socket.emit("room_exist", roomId, (exists) => {
      setRoomFound(exists);
    });

    return () => {
      socket.off("update_users");
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
