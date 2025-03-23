import { IoIosArrowDown } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import Messages from "./Messages";
import { useState } from "react";

function Chat() {
  const [expand, setExpand] = useState(true);
  const messages = [...Array(1)].map((_, index) => ({
    user: `player_${index}`,
    content: "hello 👋",
    date: "11:00PM",
  }));

  return (
    <div className="flex-1 flex flex-col">
      {/* Fixed Header */}
      <p className="text-yellow-500 font-oxanium bg-black p-4 flex justify-between items-center">
        Chat
        <IoIosArrowDown
          onClick={() => {
            setExpand(!expand);
          }}
          className={`hover:scale-125 transition-transform duration-200 cursor-pointer text-lg ${
            expand ? "-rotate-180" : ""
          }`}
        />
      </p>

      {/* Scrollable Messages Container */}
      <div
        className={`overflow-hidden  ${expand ? "flex-1" : "flex-grow-0 h-0"} `}
      >
        <div className="flex-1 overflow-auto h-full">
          <Messages messages={messages} />
        </div>

        {/* Fixed Input Field */}
        <div className="flex items-center gap-2 bg-zinc-600 p-2">
          <input
            type="text"
            className="w-full h-8 text-white appearance-none border-none outline-none bg-transparent"
            placeholder="Send a message!"
          />
          <IoSend className="text-zinc-400 text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
