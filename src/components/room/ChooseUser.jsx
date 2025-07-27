import { useRef } from "react";
import { ButtonPr } from "@/components/ui";
import { ROOM_CONSTANTS, MESSAGES } from "@/constants/room";

function ChooseUser({ onJoinRoom }) {
  const userRef = useRef(null);

  const handleJoinRoom = () => {
    const usernameValue = userRef.current.value;

    if (usernameValue === "") {
      console.log(MESSAGES.EMPTY_USERNAME_ERROR);
      return;
    }

    onJoinRoom(usernameValue);
  };

  return (
    <div className="h-full w-full flex items-center justify-center flex-col">
      <p className="text-yellow-500">{MESSAGES.CHOOSE_USERNAME}</p>
      <input
        placeholder={ROOM_CONSTANTS.DEFAULT_PLACEHOLDER}
        type="text"
        maxLength={ROOM_CONSTANTS.USERNAME_MAX_LENGTH}
        minLength={ROOM_CONSTANTS.USERNAME_MIN_LENGTH}
        ref={userRef}
        className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
      />
      <ButtonPr value={MESSAGES.JOIN_ROOM} action={handleJoinRoom} />
    </div>
  );
}

export default ChooseUser;
