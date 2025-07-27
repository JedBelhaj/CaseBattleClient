import { useState } from "react";
import { useParams } from "react-router-dom";
import MainWindow from "@/components/MainWindow";
import RoomNotFound from "./RoomNotFound";
import Loading from "./Loading";
import { Alert } from "@/components/ui";
import { SideBar, ChooseUser } from "@/components/room";
import { useRoom } from "@/hooks/useRoom";
import { useUsername } from "@/hooks/useUsername";

function Room() {
  const [gameStarted, setGameStarted] = useState(true);
  const { username, updateUsername } = useUsername();
  const { roomId } = useParams();
  
  const { roomFound, players, solo, loading, joinRoom } = useRoom(roomId, username);

  const handleJoinRoom = (usernameValue) => {
    updateUsername(usernameValue);
    joinRoom(usernameValue);
  };

  console.log("Room state:", { roomId, roomFound, solo, username, players, loading });

  return (
    <div className="bg-zinc-900 w-screen h-screen flex">
      {loading ? (
        <Loading />
      ) : roomFound ? (
        <>
          {!username && !solo && (
            <Alert content={<ChooseUser onJoinRoom={handleJoinRoom} />} />
          )}
          <MainWindow gameStarted={gameStarted} solo={solo} roomId={roomId} />
          {!solo && <SideBar players={players} />}
        </>
      ) : (
        <RoomNotFound />
      )}
    </div>
  );
}

export default Room;
