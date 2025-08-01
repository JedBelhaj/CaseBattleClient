import { ButtonPr } from "@/components/ui";
import { useNavigate } from "react-router-dom";

function RoomNotFound() {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen flex items-center justify-center flex-col">
      <p className="font-oxanium text-yellow-500 mt-10">Room Not Found</p>
      <ButtonPr value={"Home"} action={() => navigate("/")} />
    </div>
  );
}

export default RoomNotFound;
