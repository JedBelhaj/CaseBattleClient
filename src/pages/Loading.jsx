import { getRandomSkin } from "@/utils";
function Loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <img
        className="w-36 animate-[spin_2s_infinite_linear]"
        src={getRandomSkin().image}
        alt="Loading skin"
      />
      <p className="font-oxanium text-yellow-500 mt-10">Loading...</p>
    </div>
  );
}

export default Loading;
