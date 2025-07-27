import { useState } from "react";

function SlotMachine({ initialAlts = [], initialRareOpen = false }) {
  const [alts, setAlts] = useState(initialAlts);
  const [rareOpen, setRareOpen] = useState(initialRareOpen);
  const [open, setOpen] = useState(false);
  const [translate, setTranslate] = useState(
    " translate-x-[380rem] duration-[0] "
  );

  const openCaseAnimation = () => {
    setOpen(true);
    setTranslate(" translate-x-[-313rem]  duration-[4000ms] ");
    setTimeout(() => {
      setOpen(false);
      setRareOpen(false);
      setTranslate(" translate-x-[380rem] duration-[0] ");
    }, 6000);
  };

  return (
    <div className={`flex items-center justify-center overflow-clip`}>
      <div
        className={`w-1 h-32 rounded-full opacity-40 bg-white absolute z-50  ${
          open ? "" : " hidden "
        }`}
      ></div>
      <div
        className={`
      flex items-center justify-center ease-out transition-all
      ${" " + translate}`}
      >
        {alts.map((x, index) => {
          const item = x[0];

          if (rareOpen && index == 54) {
            return (
              <img
                key={index}
                style={{ borderTopColor: "#e8c40c" }}
                src="assets/rare.png"
                className={`w-48 border-t-2 m-1 -z-50`}
                alt="rare item"
              />
            );
          }
          return (
            <img
              key={index}
              style={{ borderTopColor: item?.rarity.color }}
              className={`w-48 border-t-2 m-1 -z-50`}
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
