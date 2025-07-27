import { useState, useMemo } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import Item from "./Item";
import { getItemsRarities, cs2RarityColors } from "@/utils";

function ItemsOpened({ items = [] }) {
  const [sort, setSort] = useState("new");
  const [search, setSearch] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");
  const [showStatTrak, setShowStatTrak] = useState(false);
  const [showSouvenir, setShowSouvenir] = useState(false);

  const skinCharacteristics = {
    sort: {
      new: "Newest first",
      value: "Highest value first", 
      rare: "Rarest first",
      wear: "Lowest float first",
      name: "Alphabetical",
    },
    rarities: items && items.length > 0 ? getItemsRarities(items) : [],
  };

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];

    let filtered = items.filter((item) => {
      // Safety checks
      if (!item || !item.skin) return false;
      
      const itemName = `${item.skin?.souvenir ? "Souvenir " : ""}${
        item.luck?.statTrack ? "StatTrak™ " : ""
      }${item.skin?.name || ""}${item.skin?.phase ? ` (${item.skin.phase})` : ""}`;

      // Search filter
      const matchesSearch = search === "" || 
        itemName.toLowerCase().includes(search.toLowerCase());

      // Rarity filter
      const itemRarity = item.skin?.rarity?.color;
      const matchesRarity = selectedRarity === "all" || 
        itemRarity === selectedRarity;

      // StatTrak filter
      const matchesStatTrak = !showStatTrak || item.luck?.statTrack;

      // Souvenir filter  
      const matchesSouvenir = !showSouvenir || item.skin?.souvenir;

      return matchesSearch && matchesRarity && matchesStatTrak && matchesSouvenir;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sort) {
        case "new":
          return 0; // Keep original order (newest first)
        case "value":
          // Sort by rarity value (rough approximation)
          const rarityOrder = ["#b0c3d9", "#5e98d9", "#4b69ff", "#8847ff", "#d32ce6", "#eb4b4b", "#e4ae39", "rare"];
          const aRarityIndex = rarityOrder.indexOf(a.skin?.rarity?.color || "");
          const bRarityIndex = rarityOrder.indexOf(b.skin?.rarity?.color || "");
          return bRarityIndex - aRarityIndex;
        case "rare":
          return (b.rare ? 1 : 0) - (a.rare ? 1 : 0);
        case "wear":
          return (parseFloat(a.luck?.float || 1) - parseFloat(b.luck?.float || 1));
        case "name":
          const aName = a.skin?.name || "";
          const bName = b.skin?.name || "";
          return aName.localeCompare(bName);
        default:
          return 0;
      }
    });

    return filtered;
  }, [items, search, sort, selectedRarity, showStatTrak, showSouvenir]);

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-400 mt-8">
        <p>No items opened yet. Open some cases to see your items here!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-yellow-400 text-xl mt-8 text-center">
        Items you Opened ({filteredAndSortedItems.length}/{items.length}):
      </h1>
      
      {/* Search and Filter Controls */}
      <div className="bg-gray-800 rounded-lg p-4 mt-4 space-y-4">
        {/* Search Bar */}
        <div className="flex items-center gap-2">
          <FaSearch className="text-yellow-400" />
          <input
            className="flex-1 px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
            type="text"
            placeholder="Search items by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-yellow-400 whitespace-nowrap">Sort By:</label>
            <select
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              name="sort"
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {Object.entries(skinCharacteristics.sort).map(([key, value]) => (
                <option key={key} value={key}>{value}</option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="rarity" className="text-yellow-400 whitespace-nowrap">Rarity:</label>
            <select
              className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600 focus:border-yellow-400 focus:outline-none"
              name="rarity"
              id="rarity"
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
            >
              <option value="all">All Rarities</option>
              {skinCharacteristics.rarities.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity === "rare" ? "Exceedingly Rare" : cs2RarityColors[rarity]?.[0] || rarity}
                </option>
              ))}
            </select>
          </div>

          {/* Special Filters */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-yellow-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showStatTrak}
                onChange={(e) => setShowStatTrak(e.target.checked)}
                className="rounded"
              />
              StatTrak™ Only
            </label>
            
            <label className="flex items-center gap-2 text-yellow-400 cursor-pointer">
              <input
                type="checkbox"
                checked={showSouvenir}
                onChange={(e) => setShowSouvenir(e.target.checked)}
                className="rounded"
              />
              Souvenir Only
            </label>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="mt-6">
        {filteredAndSortedItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 p-4 bg-gray-800 rounded-lg max-h-96 overflow-y-auto">
            {filteredAndSortedItems.map((item, index) => {
              const { skin, luck, rare } = item;
              return <Item key={`${index}-${skin?.id}`} skinData={skin} luck={luck} />;
            })}
          </div>
        ) : (
          <div className="text-center text-gray-400 p-8 bg-gray-800 rounded-lg">
            <FaFilter className="mx-auto mb-2 text-2xl" />
            <p>No items match your current filters.</p>
            <p className="text-sm mt-1">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemsOpened;
