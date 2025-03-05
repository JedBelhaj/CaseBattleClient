import { FaInfoCircle } from "react-icons/fa";
import { useState } from "react";

function Item({ skinData, luck }) {
  const [hover, setHover] = useState(false);

  // Extract dynamic styles
  const rarityColor = skinData?.rarity?.color || "#ffffff"; // Default to white if no color
  const itemName = `${skinData?.souvenir ? "Souvenir " : ""} ${
    luck.statTrack ? "StatTrak™ " : ""
  }${skinData?.name}${skinData?.phase ? ` (${skinData.phase})` : ""}`;

  const showInfo = (hover) => {
    setTimeout(() => {
      setHover(hover);
    }, 100);
  };

  return (
    <div className="group relative m-2 h-32 w-32 flex items-center justify-start flex-col hover:scale-110 hover:z-50 transition-all duration-150 ease-in-out cursor-default text-sm overflow-visible ">
      {/* Info Icon and Box */}
      {!skinData?.id?.startsWith("sticker") ? (
        <div className="absolute right-[-1rem] flex items-start justify-end ">
          <FaInfoCircle
            className="m-1 text-lg cursor-pointer group-hover:opacity-100 opacity-0 transition-opacity duration-300 ease-in-out"
            color={rarityColor}
            onMouseEnter={() => showInfo(true)}
            onMouseLeave={() => showInfo(false)}
          />
          {hover && (
            <div
              onMouseEnter={() => showInfo(true)}
              onMouseLeave={() => showInfo(false)}
              className="absolute right-6 h-32 w-[9.5rem] overflow-scroll flex flex-col backdrop-blur-md transition-all duration-300  bg-white/20 text-white rounded p-2 text-xs z-[9999] shadow-lg"
            >
              <p
                className=" p-1 rounded-md text-center"
                style={{ backgroundColor: rarityColor }}
              >
                {skinData.name}
              </p>
              {!Item.souvenir ? (
                <div>
                  <p>StatTrack: {luck.statTrack ? "yes" : "no"}</p>
                  <p>Wear: {luck.wear}</p>
                  <p>Float: {luck.float}</p>
                  <p>Pattern: {luck.pattern}</p>{" "}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      ) : (
        <></>
      )}

      {/* Item Image */}
      <img
        className="w-28"
        src={skinData?.image}
        alt={skinData?.name || "Item Image"}
      />

      {/* Item Name */}
      <p
        style={{ color: rarityColor }}
        className="text-white max-w-36 text-center mt-2"
      >
        {itemName}
      </p>
    </div>
  );
}

export default Item;
