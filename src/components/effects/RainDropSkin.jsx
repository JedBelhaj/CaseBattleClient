import { useEffect, useState, useRef } from "react";
import Star from "@/assets/star.svg?react";

function RainDropSkin({ Duration, Index, Delay, Skin }) {
  const [pos, setPos] = useState(getRandomPosition());
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  function getRandomPosition() {
    return {
      left: `${Math.floor(Math.random() * 100)}vw`,
      top: "-10vw", // Start slightly above the viewport
    };
  }

  useEffect(() => {
    const handleAnimationIteration = () => {
      setPos(getRandomPosition());
    };

    const imgElement = imgRef.current;
    if (imgElement) {
      imgElement.addEventListener(
        "animationiteration",
        handleAnimationIteration
      );
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener(
          "animationiteration",
          handleAnimationIteration
        );
      }
    };
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) setLoaded(true);
      else imgRef.current.onload = () => setLoaded(true);
    }
  }, [Skin]);

  return (
    <div
      style={{
        left: pos.left,
        top: pos.top,
        animationDelay: `${Delay}ms`,
        animationDuration: `${Duration}ms`,
      }}
      className={`w-20 h-16 absolute animate-raindrop-1 flex items-center justify-center`}
    >
      <img
        ref={imgRef}
        className={`transition-opacity duration-1000 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={Skin?.image || "https://via.placeholder.com/100"}
        alt={Skin?.name || "Unknown Skin"}
        loading="lazy"
        onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
      />
      {Skin?.name === "AWP | Dragon Lore" && (
        <Star className="fill-yellow-500 w-24 absolute h-24 -z-40 animate-[spin_15s_infinite_linear]" />
      )}
    </div>
  );
}

export default RainDropSkin;
