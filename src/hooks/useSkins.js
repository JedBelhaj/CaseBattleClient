import { useEffect, useState } from "react";

export const useSkins = () => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setSkins(data);
      })
      .catch((err) => console.error("Failed to fetch skins:", err));
  }, []);

  return skins;
};