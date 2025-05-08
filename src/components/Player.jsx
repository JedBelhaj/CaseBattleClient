import { RiAccountCircleFill } from "react-icons/ri";
import { FaCrown } from "react-icons/fa6";

function Player({ player, me }) {
  if (!player) return null;
  console.log(player, me);
  const textColor = player.activity
    ? me
      ? "text-yellow-300"
      : "text-yellow-600"
    : "text-zinc-500";
  return (
    <div
      className={`${textColor} p-4 bg-zinc-900 m-1 rounded-2xl flex items-center justify-start leading-tight`}
    >
      <RiAccountCircleFill className="h-10 w-10 mr-2 text-zinc-700" />
      <div>
        <div className="flex items-center">
          {player.host && (
            <p className="mx-1">
              <FaCrown />
            </p>
          )}
          {player.name + (!player.activity ? " (Disconnected)" : "")}
        </div>
        <p className="text-sm text-zinc-500">
          opened {player.items.length} case{player.items.length > 1 ? "s" : ""},
          profit: ${0}
        </p>
      </div>
    </div>
  );
}

export default Player;
