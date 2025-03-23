import ButtonPr from "../components/ButtonPr";
import { useNavigate } from "react-router";
function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col text-yellow-500 select-none bg-gradient-to-t from-slate-900 to-zinc-900">
      <div className="flex flex-col items-center justify-center bg-black/40 px-14 py-12 rounded-3xl backdrop-blur-sm z-50 transition-all duration-500">
        <h1 className="bg-gradient-to-r from-yellow-500 to-amber-500 bg-clip-text text-transparent text-5xl sm:text-7xl font-oxanium text-center">
          Sign Up!
        </h1>
        <div className="flex flex-col items-center justify-center m-4">
          <p className="mt-2">Username:</p>
          <input
            placeholder="ShadawStyleSmpl"
            type="text"
            maxLength={14}
            className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
          />
          <p className="mt-2">Passowrd:</p>
          <input
            placeholder="*******"
            type="password"
            maxLength={14}
            minLength={8}
            className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
          />
          <p className="mt-2">Confirm Password:</p>
          <input
            placeholder="*******"
            type="password"
            maxLength={14}
            minLength={8}
            className="h-10 mx-4 mt-1 rounded-xl bg-zinc-800 border-zinc-700 border-2 text-center text-white focus:border-zinc-700"
          />
          <ButtonPr value={"Create Room"} />
          <a
            onClick={() => {
              navigate("/");
            }}
            className="underline text-sm cursor-pointer"
          >
            Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
