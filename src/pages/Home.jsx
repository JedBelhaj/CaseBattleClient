import { useEffect, useState, useRef } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router";
import RainDropSkin from "../components/RainDropSkin";
import ButtonPr from "../components/ButtonPr";
import socket from "./socket";

function Home() {
  const [skins, setSkins] = useState([]);
  const [roomID, setRoomID] = useState("");
  const [username, setUsername] = useState("");
  const [warning, setWarning] = useState("");

  const usernameRef = useRef(null);
  const roomIdRef = useRef(null);

  const getValues = () => {
    setUsername(usernameRef.current.value);
    setRoomID(roomIdRef.current.value);
    console.log(username, " ", roomID);
  };

  const messages = {
    shortUsername: "Username is too short",
    invalidRoomID: "RoomID is Invalid",
    unknown: "Unknown Error, please try again later",
  };

  const navigate = useNavigate();

  const skinCount = 200;

  useEffect(() => {
    fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json")
      .then((res) => res.json())
      .then((data) => {
        setSkins(data);
      })
      .catch((err) => console.error("Failed to fetch skins:", err));
  }, []);

  const createRoom = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value.trim();

    if (usernameValue.length >= 3) {
      console.log("creating room...");
      socket.emit("create_room", usernameValue);
    } else {
      setWarning(messages.shortUsername);
    }
  };

  socket.on("error", (message) => {
    setWarning(message);
  });

  socket.on("room_created", (roomId) => {
    console.log(`Room successfully created: ${roomId}`);

    navigate(`/room/${roomId}`);
  });

  const joinRoom = (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value.trim();
    const roomIDValue = roomIdRef.current.value.trim().toUpperCase();

    if (usernameValue.length >= 3 && roomIDValue.length === 4) {
      socket.emit("join_room", {
        username: usernameValue,
        roomId: roomIDValue,
      });

      socket.on("room_found", () => {
        navigate(`/room/${roomIDValue}`);
      });

      socket.on("error", (message) => {
        setWarning(message);
      });
    } else {
      setWarning(messages.invalidRoomID);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col text-yellow-500 select-none bg-gradient-to-t from-slate-900 to-zinc-900">
      <RiAccountCircleFill className="absolute top-0 right-0 w-14 h-14 m-4 bg-black/20 p-2 rounded-2xl backdrop-blur-sm hover:scale-110 cursor-pointer z-50 duration-200" />
      <div className="flex flex-col items-center justify-center bg-black/40 px-14 py-12 rounded-3xl backdrop-blur-sm z-50 transition-all duration-500">
        <h1 className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-5xl sm:text-7xl font-oxanium text-center">
          Welcome to Case Battle!
        </h1>
        <p className="text-white">CS 1v1 Case Opening Simulator</p>
        <div className="flex items-center justify-center mt-8 flex-wrap sm:flex-nowrap">
          <div className="flex flex-col items-center justify-center sm:border-r-2 border-white/10 ">
            <p className="">Username:</p>
            <input
              placeholder="ShadawStyleSmpl"
              type="text"
              maxLength={14}
              ref={usernameRef}
              className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
            />
            <ButtonPr action={createRoom} value={"Create Room"} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="">Room Code:</p>
            <input
              placeholder="ABCD"
              type="text"
              maxLength={4}
              ref={roomIdRef}
              className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
            />
            <ButtonPr value={"Join a Room"} action={joinRoom} />
          </div>
        </div>
      </div>

      <div className="absolute overflow-hidden h-screen w-screen flex">
        {skins.length > 0 &&
          Array.from({ length: skinCount }).map((_, index) => {
            const randomSkin =
              skins[Math.floor(Math.random() * skins.length)] || {}; // Ensure there's a valid skin
            return (
              <div className="left-[10rem]" key={index}>
                <RainDropSkin
                  Skin={randomSkin}
                  Duration={Math.random() * 7000 + 15000}
                  Delay={-Math.random() * 14000}
                  Index={index}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
