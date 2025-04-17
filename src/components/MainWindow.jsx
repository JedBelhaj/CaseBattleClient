import { useEffect, useState, useMemo } from "react";
import Case from "./Case";
import { getAllRarities, getCrateRarities } from "./utils";
import RoomSetup from "./RoomSetup";

function MainWindow({ gameStarted, solo }) {
  console.log({ gameStarted, solo });

  const [cases, setCases] = useState([]);
  const [currType, setCurrType] = useState("Case");
  const [chosenCase, setChosenCase] = useState("");

  // Fetch cases on mount
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCases(
          data.filter(
            (x) =>
              ["Case", "Sticker Capsule", "Souvenir"].indexOf(x.type) !== -1
          )
        );
        // Set initial chosen case if data is available
        if (data.length > 0) {
          setChosenCase(data[0].name);
        }
      });
  }, []);

  // Generate types dynamically
  const types = useMemo(
    () => [...new Set(cases.map((x) => x.type).filter((x) => x !== null))],
    [cases]
  );

  // Filter and sort cases based on the selected type
  const filteredCases = useMemo(
    () => cases.filter((x) => x.type === currType),
    [cases, currType]
  );

  const sortedCases = useMemo(
    () => [...filteredCases].sort((x, y) => x.name.localeCompare(y.name)),
    [filteredCases]
  );

  // Update chosenCase whenever currType or sortedCases changes
  useEffect(() => {
    if (sortedCases.length > 0) {
      setChosenCase(sortedCases[0].name);
    } else {
      setChosenCase(""); // Reset if no cases match
    }
  }, [currType, sortedCases]);

  return (
    <div
      onKeyDown={(e) => {
        e.persist();
        console.log(e);
      }}
      className="w-full h-screen bg-zinc-900 flex flex-col items-center justify-start p-4 overflow-scroll"
    >
      <div className="bg-yellow-600 w-full h-fit p-3 rounded-3xl flex justify-between items-center">
        <h1 className="font-bold font-mono">Gambalé Gambamé</h1>
        <div className="flex items-center justify-center flex-col">
          <h1>Profit: +100$</h1>
          <h1>Wallet: 500$</h1>
        </div>
      </div>
      {gameStarted || solo ? (
        <div className="w-full flex items-center justify-center flex-col gap-2 p-8">
          {/* Choose type */}
          <div className="text-white bg-zinc-800 p-4 rounded-lg">
            <label htmlFor="type">Choose a Type:</label>
            <select
              onChange={(e) => setCurrType(e.target.value)}
              value={currType}
              name="type"
              id="type"
              className="bg-zinc-800 m-2"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          {/* Choose crate */}
          <div className="text-white bg-zinc-800 p-4 rounded-lg flex items-center justify-center">
            <label htmlFor="case">Choose a Case:</label>
            <select
              onChange={(e) => setChosenCase(e.target.value)}
              value={chosenCase}
              name="case"
              id="case"
              className="bg-zinc-800 m-2"
            >
              {sortedCases.map((crate) => (
                <option key={crate.id} value={crate.name}>
                  {crate.name}
                </option>
              ))}
            </select>
          </div>
          {/* Display case details */}
          <Case
            caseData={sortedCases.find((x) => x.name === chosenCase)}
            solo={solo}
          />
        </div>
      ) : (
        <RoomSetup />
      )}
    </div>
  );
}

export default MainWindow;
