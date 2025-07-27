import { memo } from "react";
import RainDropSkin from "./RainDropSkin";

// using memo because this component should not rerender ever to maintain smooth animation without choppiness everytime a user presses a button
const RainDropEffect = memo(({ skins, skinCount }) => {
  return (
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
  );
});

export default RainDropEffect;
