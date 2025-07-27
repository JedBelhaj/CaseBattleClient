import { useState } from "react";
import { Chat } from "@/components/chat";
import Players from "./Players";

function SideBar({ players }) {
  const [showChat, setShowChat] = useState(true);
  const [showPlayers, setShowPlayers] = useState(true);
  return (
    <div className="z-30 w-4/12 bg-zinc-800 flex flex-col max-h-full overflow-auto">
      <Players players={players} />
      <Chat />
    </div>
  );
}

export default SideBar;
