import { IoIosArrowDown } from "react-icons/io";
import Player from "./Player";
import { useState } from "react";

function Players({ players }) {
  const [expand, setExpand] = useState(true);
  return (
    <div
      className={`${
        expand ? "flex-1 h-1/2" : "h-fit"
      } flex flex-col transition-all`}
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
        className={`overflow-auto ${
          expand ? "flex-1 h-fit" : "flex-grow-0 h-0"
        } `}
      >
        {players.map((p, index) => (
          <Player player={p} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Players;
