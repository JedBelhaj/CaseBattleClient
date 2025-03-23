import { RiAccountCircleFill } from "react-icons/ri";

function Player({ player }) {
  return (
    <div className="text-yellow-500 p-4 bg-zinc-900 m-1 rounded-2xl flex items-center justify-start leading-tight">
      <RiAccountCircleFill className="h-10 w-10 mr-2 text-zinc-700" />
      <div>
        <p>{player.name}</p>
        <p className="text-sm text-zinc-500">
          opened {player.casesOpened} case{player.casesOpened > 1 ? "s" : ""},
          profit: ${player.profit}
        </p>
      </div>
    </div>
  );
}

export default Player;
