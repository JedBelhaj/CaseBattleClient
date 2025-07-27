import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { RainDropEffect } from "@/components/effects";
import { ButtonPr } from "@/components/ui";
import AccountMenu from "@/components/AccountMenu";
import { useSkins } from "@/hooks/useSkins";

function Home() {
  const skins = useSkins();
  const [warning, setWarning] = useState("");
  const [showAccount, setShowAccount] = useState(false);

  const usernameRef = useRef(null);
  const roomIdRef = useRef(null);
  const navigate = useNavigate();

  const messages = {
    shortUsername: "Username is too short",
    invalidroomId: "roomId is Invalid",
    unknown: "Unknown Error, please try again later",
  };

  const skinCount = 200;

  const playSolo = (e) => {
    e.preventDefault();
    navigate("/room/_solo");
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col text-yellow-500 select-none bg-gradient-to-t from-slate-900 to-zinc-900">
      <RiAccountCircleFill
        onClick={() => {
          setShowAccount(!showAccount);
        }}
        className="absolute top-0 right-0 w-14 h-14 m-4 bg-black p-2 rounded-2xl hover:scale-110 cursor-pointer duration-200 z-[99999]"
      />
      {showAccount && (
        <AccountMenu
          isVisible={showAccount}
          onClose={() => setShowAccount(false)}
        />
      )}
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
            <ButtonPr value={"Create Room"} />
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
            <ButtonPr value={"Join a Room"} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-1">
          <p className="text-red-700">{warning}</p>
          <p className="text-gray-400">or...</p>
          <ButtonPr value={"Play Solo"} action={playSolo} />
        </div>
      </div>
      <RainDropEffect skins={skins} skinCount={skinCount} />
    </div>
  );
}

export default Home;

