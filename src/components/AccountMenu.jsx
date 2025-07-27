import { useNavigate } from "react-router-dom";
import ButtonPr from "./ButtonPr";

function AccountMenu({ isVisible, onClose }) {


  if (!isVisible) return null;

  return (
    <div className="z-[99999] absolute top-0 right-0 m-20 font-oxanium flex flex-col items-center justify-center bg-black animate-fade-in rounded-2xl duration-200 p-8">
      <div className="m-2">
        <p>Username</p>
        <input
          placeholder="ShadawStyleSmpl"
          type="text"
          maxLength={14}
          className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
        />
      </div>
      <div className="m-2">
        <p>password</p>
        <input
          placeholder="********"
          type="password"
          maxLength={14}
          className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <ButtonPr value={"Login"} />
        <a
          className="underline text-sm cursor-pointer"
        >
          Create an account
        </a>
      </div>
    </div>
  );
}

export default AccountMenu;