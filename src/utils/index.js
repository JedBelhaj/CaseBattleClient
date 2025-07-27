export const cs2RarityColors = {
  "#b0c3d9": ["Consumer Grade", "Gray"],
  "#5e98d9": ["Industrial Grade", "Baby Blue"],
  "#4b69ff": ["Mil-Spec", "Blue"],
  "#8847ff": ["Restricted", "Purple"],
  "#d32ce6": ["Classified", "Pink"],
  "#eb4b4b": ["Covert", "Red"],
  "#e4ae39": ["Contraband", "Orange"],
  rare: ["Exceedingly Rare", "Rare"],
};

export const baseurl = "api url here";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

export const getRequest = async (url, body) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }
    return { error: true, message };
  }
  return data;
};

const getCases = await fetch(
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/crates.json"
)
  .then((res) => res.json())
  .then((data) =>
    data.filter(
      (x) => ["Case", "Sticker Capsule", "Souvenir"].indexOf(x.type) !== -1
    )
  );

export function addHexColor(c1, c2) {
  // Remove the '#' symbol if present
  c1 = c1.startsWith("#") ? c1.slice(1) : c1;
  c2 = c2.startsWith("#") ? c2.slice(1) : c2;

  // Add the two hex colors
  let hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);

  // Zero pad to ensure the result is 6 characters long
  while (hexStr.length < 6) {
    hexStr = "0" + hexStr;
  }

  return `#${hexStr}`; // Return the result with a '#' prefix
}

export const cachedSkinData = await fetch(
  "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
).then((res) => res.json());

function getSkinData(skinID) {
  return cachedSkinData.find((x) => x.id === skinID);
}

export function getRandomSkin() {
  return cachedSkinData[Math.floor(Math.random() * cachedSkinData.length)];
}

const odds = {
  Case: {
    "#4b69ff": 79.92,
    "#8847ff": 15.98,
    "#d32ce6": 3.2,
    "#eb4b4b": 0.64,
    rare: 0.26,
    // "#4b69ff": 1,
    // "#8847ff": 0,
    // "#d32ce6": 0,
    // "#eb4b4b": 0,
    // rare: 99,
  },
  Souvenir: {
    "#b0c3d9": 80,
    "#5e98d9": 16,
    "#4b69ff": 3.2,
    "#8847ff": 0.64,
    "#d32ce6": 0.128,
    "#eb4b4b": 0.0256,
  },
  "Sticker Capsule": {
    "#4b69ff": 80,
    "#8847ff": 16,
    "#d32ce6": 3.2,
    "#eb4b4b": 0.641,
  },
};

export function selectRarity(caseData) {
  const rarities = getCrateRarities(caseData);

  // Ensure rarities are in descending probability order
  rarities.sort((a, b) => odds[caseData.type][b] - odds[caseData.type][a]);

  const random = Math.random(); // Random value between 0 and 1
  let cumulative = 0;

  for (let i = 0; i < rarities.length; i++) {
    const rarity = rarities[i];
    const rarityOdds = odds[caseData.type][rarity];

    if (rarityOdds === undefined) {
      console.error(
        `Rarity "${rarity}" not found in odds for case type "${caseData.type}".`
      );
      continue;
    }

    cumulative += rarityOdds / 100; // Normalize odds to a 0-1 range
    if (random < cumulative) {
      return rarity;
    }
  }

  // Default fallback: return the lowest rarity
  // console.warn(
  //   `Defaulting to last rarity. Random: ${random}, Cumulative: ${cumulative}`
  // );
  return rarities[rarities.length - 1];
}

function statTrack() {
  return Math.random() <= 0.1;
}

function selectFloat(minFloat, maxFloat) {
  let luck = Math.random() * (maxFloat - minFloat) + minFloat;
  let wear = "";
  let float;
  if (luck < 0.03) {
    float = Math.random() * 0.07;
    wear = "Factory New";
  } else if (luck < 0.27) {
    float = Math.random() * 0.08 + 0.07;
    wear = "Minimal Wear";
  } else if (luck < 0.6) {
    float = Math.random() * 0.23 + 0.15;
    wear = "Field Tested";
  } else if (luck < 0.84) {
    float = Math.random() * 0.07 + 0.38;
    wear = "Well Worn";
  } else {
    float = Math.random() * 0.55 + 0.45;
    wear = "Battle Scarred";
  }
  return { float, wear };
}

function selectPaintIndex() {
  return Math.floor(Math.random() * 1000);
}

export const RNG = (caseData) => {
  return {
    rarity: selectRarity(caseData),
    statTrack: statTrack(),
    pattern: selectPaintIndex(),
  };
};

export function selectRare(caseDate) {
  return randomChoice(caseDate.contains_rare);
}

export const openCase = (caseData) => {
  const items = caseData.contains;
  const luck = RNG(caseData);

  const filteredItems = items.filter((x) => x.rarity.color === luck.rarity);

  let skin =
    luck.rarity === "rare" ? selectRare(caseData) : randomChoice(filteredItems);

  if (caseData.type !== "Sticker Capsule") {
    skin = getSkinData(skin.id);
  }
  if (caseData.type === "Case") {
    const { float, wear } = selectFloat(skin.min_float, skin.max_float);

    luck["float"] = float.toFixed(14);
    luck["wear"] = wear;
  }

  const returnValue = {
    skin,
    luck,
    rare: luck.rarity === "rare",
  };

  return returnValue;
};

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getCrateRarities(crate) {
  if (crate) {
    const rarities = crate.contains.map((x) => x.rarity.color).filter(unique);
    if (crate.contains_rare.length > 0) {
      rarities.push("rare");
    }
    return rarities.reverse();
  }
}

export function getItemsRarities(items) {
  if (!items || items.length === 0) return [];
  
  const rarities = items
    .map((item) => {
      // Handle both direct items and opened case items
      if (item.skin && item.skin.rarity && item.skin.rarity.color) {
        return item.skin.rarity.color;
      } else if (item.rarity && item.rarity.color) {
        return item.rarity.color;
      }
      return null;
    })
    .filter((rarity) => rarity !== null)
    .filter(unique);
    
  return rarities.reverse();
}

function unique(x, index, arr) {
  return arr.indexOf(x) === index;
}

export function getAllRarities(crates) {
  const rarities = crates
    .map((x) => getCrateRarities(x))
    .filter((x) => x.length != 0)
    .map((x) => x.reduce((x, y) => x + ", " + y))
    .filter(unique);
  return rarities;
}
