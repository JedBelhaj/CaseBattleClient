import { IoIosArrowDown } from "react-icons/io";
import Player from "./Player";
import { useEffect, useState } from "react";

function Players({ players }) {
  const [expand, setExpand] = useState(true);
  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    const sorted = players.sort((a, b) => {
      if (a.activity) {
        if (b.activity) {
          return 0;
        }
        return -1;
      }
      if (b.activity) {
        return 1;
      }
      return 0;
    });

    const myIndex = sorted.findIndex(
      (a) => a.name === localStorage.getItem("username")
    );
    console.log("I am", localStorage.getItem("username"));

    if (myIndex != -1) {
      const aux = sorted[0];
      sorted[0] = sorted[myIndex];
      sorted[myIndex] = aux;
    }

    setSortedPlayers(sorted);
  }, [players]);
  return (
    <div
      className={`${
        expand ? "flex-1" : "flex-shrink-0"
      } flex flex-col transition-all duration-200`}
    >
      <p className="text-yellow-500 font-oxanium bg-black p-4 flex justify-between items-center">
        Players
        <IoIosArrowDown
          onClick={() => {
            setExpand(!expand);
          }}
          className={`hover:scale-125 transition-transform duration-200 cursor-pointer text-lg ${
            expand ? "-rotate-180" : ""
          }`}
        />
      </p>

      <div
        className={`transition-all duration-200 ${
          expand ? "flex-1 overflow-auto" : "h-0 overflow-hidden"
        }`}
      >
        {sortedPlayers.map((p, index) => (
          <Player me={index == 0} player={p} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Players;
