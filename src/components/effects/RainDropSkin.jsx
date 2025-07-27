import { useEffect, useState, useRef, memo } from "react";
import Star from "@/assets/star.svg?react";
import { skinCacheService } from "@/services/skinCache";
import { SKIN_CACHE_CONFIG, EFFECT_CONFIG } from "@/constants/skinCache";

const RainDropSkin = memo(({ Duration, Index, Delay, Skin }) => {
  const [pos, setPos] = useState(getRandomPosition());
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
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
    if (imgRef.current && Skin?.image) {
      // Check if image is already preloaded
      const preloadedImage = skinCacheService.imageCache.get(Skin.image);
      if (preloadedImage) {
        setLoaded(true);
        return;
      }

      // Handle image loading
      if (imgRef.current.complete) {
        setLoaded(true);
      } else {
        imgRef.current.onload = () => setLoaded(true);
        imgRef.current.onerror = () => {
          setError(true);
          setLoaded(true); // Show fallback
        };
      }
    }
  }, [Skin?.image]);

  // Get image source with fallback
  const getImageSrc = () => {
    if (error) return SKIN_CACHE_CONFIG.ERROR_IMAGE;
    return Skin?.image || SKIN_CACHE_CONFIG.FALLBACK_IMAGE;
  };

  // Check if this skin has special effects
  const specialEffect = EFFECT_CONFIG.RAINDROP.SPECIAL_EFFECTS[Skin?.name];
  const hasSpecialEffect = specialEffect?.hasSpecialEffect;

  return (
    <div
      style={{
        left: pos.left,
        top: pos.top,
        animationDelay: `${Delay}ms`,
        animationDuration: `${Duration}ms`,
      }}
      className={`w-20 h-16 absolute animate-raindrop-1 flex items-center justify-center ${
        hasSpecialEffect ? 'z-10' : ''
      }`}
    >
      <img
        ref={imgRef}
        className={`transition-opacity duration-${EFFECT_CONFIG.ANIMATIONS.FADE_DURATION} ${
          loaded ? "opacity-100" : "opacity-0"
        } ${error ? 'filter grayscale' : ''}`}
        src={getImageSrc()}
        alt={Skin?.name || "Unknown Skin"}
        loading="lazy"
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain'
        }}
      />
      {hasSpecialEffect && specialEffect.effectType === "star_spin" && (
        <Star 
          className={`fill-yellow-500 w-24 absolute h-24 -z-40 animate-[spin_${
            specialEffect.effectDuration
          }_infinite_linear]`} 
        />
      )}
      {/* Add debug info in development */}
      {process.env.NODE_ENV === 'development' && error && (
        <div className="absolute top-0 right-0 text-xs text-red-500 bg-black/50 px-1">
          !
        </div>
      )}
    </div>
  );
});

RainDropSkin.displayName = 'RainDropSkin';

export default RainDropSkin;
