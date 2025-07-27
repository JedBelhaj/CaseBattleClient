import { memo, useMemo } from "react";
import RainDropSkin from "./RainDropSkin";
import { EFFECT_CONFIG } from "@/constants/skinCache";

// Using memo because this component should not rerender ever to maintain smooth animation
const RainDropEffect = memo(({ skins, skinCount = EFFECT_CONFIG.RAINDROP.DEFAULT_COUNT }) => {
  // Memoize the random skins to prevent regeneration on rerenders
  const skinInstances = useMemo(() => {
    if (!skins || skins.length === 0) return [];
    
    return Array.from({ length: Math.min(skinCount, EFFECT_CONFIG.RAINDROP.MAX_COUNT) }).map((_, index) => {
      const randomSkin = skins[Math.floor(Math.random() * skins.length)] || {};
      const duration = Math.random() * 
        (EFFECT_CONFIG.RAINDROP.MAX_DURATION - EFFECT_CONFIG.RAINDROP.MIN_DURATION) + 
        EFFECT_CONFIG.RAINDROP.MIN_DURATION;
      const delay = -Math.random() * 14000;
      
      return {
        id: `skin-${index}`,
        skin: randomSkin,
        duration,
        delay,
        index
      };
    });
  }, [skins, skinCount]);

  if (!skins || skins.length === 0) {
    return (
      <div className="absolute overflow-hidden h-screen w-screen flex items-center justify-center">
        <div className="text-zinc-500 text-sm">Loading skins...</div>
      </div>
    );
  }

  return (
    <div className="absolute overflow-hidden h-screen w-screen flex">
      {skinInstances.map(({ id, skin, duration, delay, index }) => (
        <div className="left-[10rem]" key={id}>
          <RainDropSkin
            Skin={skin}
            Duration={duration}
            Delay={delay}
            Index={index}
          />
        </div>
      ))}
    </div>
  );
});

RainDropEffect.displayName = 'RainDropEffect';

export default RainDropEffect;
