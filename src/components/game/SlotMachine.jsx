import { useEffect, useState, useRef } from "react";
import { openCase } from "@/utils";

function SlotMachine({ caseData, isActive, onComplete }) {
  const timeOutRef = useRef(null);
  const [alts, setAlts] = useState([]);
  const [rareOpen, setRareOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState(" translate-x-[380rem] duration-[0] ");

  // Keyboard controls for skipping animation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter" && open) {
        clearTimeout(timeOutRef.current);
        cleanUpCaseAnimation();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  // Start animation when isActive changes
  useEffect(() => {
    if (isActive && caseData) {
      openCaseAnimation();
    }
  }, [isActive, caseData]);

  // Generate items when opening
  useEffect(() => {
    if (open && caseData) {
      let alts = [...Array(59)].map(() => openCase(caseData));
      
      // Check if winning item (index 54) is rare
      if (alts[54].rare) {
        setRareOpen(true);
      }

      // Handle multiple rares - only allow one at winning position
      const rares = alts.filter((x) => x.rare);
      for (let i = 0; i < rares.length; i++) {
        const rareIndex = alts.indexOf(rares[i]);
        if (rareIndex !== 54) {
          while (alts[rareIndex].rare) {
            alts[rareIndex] = openCase(caseData);
          }
        }
      }

      setAlts(alts);
    } else {
      setAlts([]);
    }
  }, [open, caseData]);

  const cleanUpCaseAnimation = () => {
    setOpen(false);
    setRareOpen(false);
    setTranslate(" translate-x-[380rem] duration-[0] ");
    
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    // Return the winning item to parent
    if (alts.length >= 55 && onComplete) {
      onComplete(alts[54]);
    }
  };

  const openCaseAnimation = () => {
    setOpen(true);
    setTranslate(" translate-x-[-313rem] duration-[4000ms] ");
    timeOutRef.current = setTimeout(() => cleanUpCaseAnimation(), 4500);
  };

  if (!caseData) {
    return <div>No case data provided</div>;
  }

  return (
    <div className="flex items-center justify-center overflow-clip">
      <div
        className={`w-1 h-32 rounded-full opacity-40 bg-white absolute z-50 ${
          open ? "" : "hidden"
        }`}
      />
      <div
        className={`flex items-center justify-center ease-out transition-all ${translate}`}
      >
        {alts.map((x, index) => {
          const item = x.skin;

          if (rareOpen && index === 54) {
            return (
              <img
                key={index}
                style={{ borderTopColor: "#e8c40c" }}
                src="/assets/rare.png"
                className="w-48 border-t-2 m-1 -z-50"
                alt="rare item"
              />
            );
          }
          
          return (
            <img
              key={index}
              style={{ borderTopColor: item?.rarity.color }}
              className="w-48 border-t-2 m-1 -z-50"
              src={item?.image}
              alt={item?.name}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SlotMachine;
