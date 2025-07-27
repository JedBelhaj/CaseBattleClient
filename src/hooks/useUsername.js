import { useState } from "react";

export const useUsername = () => {
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  const updateUsername = (newUsername) => {
    setUsername(newUsername);
    localStorage.setItem("username", newUsername);
  };

  const clearUsername = () => {
    setUsername("");
    localStorage.removeItem("username");
  };

  return {
    username,
    updateUsername,
    clearUsername,
  };
};
