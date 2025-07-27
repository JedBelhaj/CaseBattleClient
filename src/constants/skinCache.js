export const SKIN_CACHE_CONFIG = {
  // API configuration
  API_URL: "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json",
  
  // Cache settings
  STORAGE_KEY: "casebattle_skins_cache",
  CACHE_VERSION: "1.0.0",
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours
  
  // Image preloading settings
  PRELOAD_BATCH_SIZE: 15,
  PRELOAD_DELAY: 100, // ms between batches
  PRIORITY_PRELOAD_COUNT: 100, // High-priority skins to preload first
  
  // Performance settings
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 10000, // 10 seconds
  
  // Fallback settings
  FALLBACK_IMAGE: "https://via.placeholder.com/100?text=Skin",
  ERROR_IMAGE: "https://via.placeholder.com/100?text=Error",
};

export const SKIN_CATEGORIES = {
  RARITY: {
    COVERT: "Covert",
    CLASSIFIED: "Classified", 
    RESTRICTED: "Restricted",
    MIL_SPEC: "Mil-Spec",
    INDUSTRIAL: "Industrial Grade",
    CONSUMER: "Consumer Grade"
  },
  
  WEAPON_TYPES: {
    RIFLE: ["AK-47", "M4A4", "M4A1-S", "AWP"],
    PISTOL: ["Glock-18", "USP-S", "Deagle"],
    SMG: ["MP7", "P90", "UMP-45"],
    KNIFE: ["Knife", "Bayonet", "Karambit"]
  }
};

export const EFFECT_CONFIG = {
  // Raindrop effect settings
  RAINDROP: {
    DEFAULT_COUNT: 50,
    MAX_COUNT: 200,
    MIN_DURATION: 15000, // 15 seconds (slower)
    MAX_DURATION: 22000, // 22 seconds (slower)
    SPECIAL_EFFECTS: {
      "AWP | Dragon Lore": {
        hasSpecialEffect: true,
        effectType: "star_spin",
        effectDuration: "15s"
      }
    }
  },
  
  // Animation settings
  ANIMATIONS: {
    FADE_DURATION: 1000,
    SPIN_DURATION: 15000,
    BOUNCE_DURATION: 2000
  }
};
