import React, { useState, useCallback, useEffect } from 'react';
import SlotMachine from './SlotMachine';
import UnboxedItem from '../UnboxedItem';
import ItemsOpened from './ItemsOpened';
import { getCrateRarities, cs2RarityColors } from '@/utils';

function CaseOpener({ caseData, solo }) {
  // State management
  const [isOpening, setIsOpening] = useState(false);
  const [currentWinner, setCurrentWinner] = useState(null);
  const [showUnboxed, setShowUnboxed] = useState(false);
  const [itemsOpened, setItemsOpened] = useState([]);
  const [rarities, setRarities] = useState([]);

  // Initialize case data
  useEffect(() => {
    if (caseData) {
      setRarities(getCrateRarities(caseData));
    }
  }, [caseData]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !isOpening && !showUnboxed) {
        handleOpenCase();
      }
      if (e.key === 'Escape' && showUnboxed) {
        setShowUnboxed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpening, showUnboxed]);

  // Start case opening
  const handleOpenCase = useCallback(() => {
    if (isOpening || !caseData) return;
    setIsOpening(true);
    setCurrentWinner(null);
    setShowUnboxed(false);
  }, [isOpening, caseData]);

  // Handle animation completion
  const handleAnimationComplete = useCallback((winningItem) => {
    setCurrentWinner(winningItem);
    setItemsOpened(prev => [...prev, winningItem]);
    setIsOpening(false);
    setShowUnboxed(true);
  }, []);

  // Generate simulation for display
  const generateSimulation = useCallback(() => {
    if (!caseData || !rarities.length) return [];
    
    // Quick simulation for display
    const simulationSize = 1000;
    const results = {};
    
    // Initialize counters
    rarities.forEach(rarity => {
      results[rarity] = 0;
    });

    // Simple probability calculation instead of full simulation
    const totalWeight = rarities.length;
    rarities.forEach((rarity, index) => {
      // Simulate rarity distribution (more common = higher count)
      const weight = totalWeight - index;
      results[rarity] = Math.floor(simulationSize * (weight / (totalWeight * (totalWeight + 1) / 2)));
    });

    return rarities.map(rarity => [rarity, results[rarity]]);
  }, [caseData, rarities]);

  // Get readable rarity name
  const getReadableName = useCallback((rarity) => {
    if (rarity === "rare") return "Rare";
    const colorEntry = Object.entries(cs2RarityColors).find(([key]) => key === rarity);
    return colorEntry ? colorEntry[1][0] : rarity;
  }, []);

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-64 text-white">
        <p className="text-xl">No case selected</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Case Opening Area */}
      {!isOpening ? (
        <div className="flex flex-col items-center space-y-6 w-full max-w-6xl">
          {/* Simulation Display */}
          <div className="bg-gray-800 rounded-lg p-4 w-full">
            <h3 className="text-white text-lg font-semibold mb-3">
              Probability Simulation (1000 cases):
            </h3>
            <div className="flex flex-wrap gap-3 justify-center">
              {generateSimulation().map(([rarity, count], index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 bg-gray-700 rounded px-3 py-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: rarity === "rare" ? "#e8c40c" : rarity }}
                  />
                  <span className="text-white font-medium">
                    {count} {getReadableName(rarity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Case Image and Open Button */}
          <div className="flex flex-col items-center space-y-4">
            <img
              src={caseData.image}
              alt={caseData.name}
              className="w-72 h-auto cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={handleOpenCase}
            />
            
            <div className="text-center">
              <h2 className="text-white text-2xl font-bold mb-2">{caseData.name}</h2>
              <p className="text-yellow-400 animate-bounce">
                ↑ Click or press Enter to open ↑
              </p>
              
              <button
                onClick={handleOpenCase}
                className="mt-4 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold text-lg rounded-lg transition-colors duration-200"
              >
                OPEN CASE
              </button>
            </div>
          </div>

          {/* Case Contents */}
          <div className="w-full">
            <h3 className="text-white text-xl font-semibold mb-4 text-center">
              Case Contents:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {caseData.contains.map((item, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg p-3 hover:scale-105 transition-transform duration-200"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-24 object-contain mb-2"
                  />
                  <p
                    className="text-sm text-center font-medium truncate"
                    style={{ color: item.rarity.color }}
                  >
                    {item.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Items Opened History */}
          {itemsOpened.length > 0 && (
            <div className="w-full">
              <ItemsOpened items={itemsOpened} />
            </div>
          )}
        </div>
      ) : (
        /* Slot Machine Animation */
        <div className="w-full max-w-4xl">
          <div className="text-center mb-4">
            <p className="text-yellow-400 text-lg animate-bounce">
              Opening case... Press Enter to skip animation
            </p>
          </div>
          
          <SlotMachine
            caseData={caseData}
            isActive={isOpening}
            onComplete={handleAnimationComplete}
          />
        </div>
      )}

      {/* Unboxed Item Modal */}
      {showUnboxed && currentWinner && (
        <UnboxedItem
          item={currentWinner}
          unbox={showUnboxed}
          solo={solo}
        />
      )}
    </div>
  );
}

export default CaseOpener;
