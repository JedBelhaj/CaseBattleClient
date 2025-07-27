import { useState, useEffect } from "react";
import socket from "@/services/socket";
import { ROOM_CONSTANTS } from "@/constants/room";

export const useRoom = (roomId, username) => {
  // Initialize roomFound based on whether it's a solo game or TEST room
  const isTestRoom = roomId === "TEST";
  const isSoloRoom = roomId === ROOM_CONSTANTS.SOLO_ROOM_ID;
  const [roomFound, setRoomFound] = useState(isSoloRoom || isTestRoom);
  const [players, setPlayers] = useState([]);
  const [solo, setSolo] = useState(isSoloRoom);
  const [loading, setLoading] = useState(!roomId || (!isSoloRoom && !isTestRoom));

  useEffect(() => {
    if (!roomId) {
      console.warn("No roomId provided");
      setLoading(false);
      return;
    }

    // Handle solo room
    if (roomId === ROOM_CONSTANTS.SOLO_ROOM_ID) {
      setSolo(true);
      setRoomFound(true);
      setLoading(false);
      return;
    }

    // Handle TEST room (simulate online room)
    if (roomId === "TEST") {
      setSolo(false);
      setRoomFound(true);
      setLoading(false);
      
      // Simulate some players in the TEST room
      const mockPlayers = [
        { id: 1, username: username || "You", isReady: false, items: [], name: username || "You", activity: true },
        { id: 2, username: "TestPlayer1", isReady: true, items: [], name: "TestPlayer1", activity: true },
        { id: 3, username: "TestPlayer2", isReady: false, items: [], name: "TestPlayer2", activity: true },
      ];
      setPlayers(mockPlayers);
      
      console.log("✅ Joined TEST room (simulated)");
      return;
    }

    // Handle real rooms (with socket connection)
    setSolo(false);
    setRoomFound(false);
    setLoading(true);

    // Add timeout for socket response to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn("Socket timeout - room might not exist");
      setRoomFound(false);
      setLoading(false);
    }, 5000);

    socket.emit("room_exist", roomId, (exists) => {
      clearTimeout(timeoutId);
      setRoomFound(exists);
      setLoading(false);
    });

    if (roomFound && username && roomId !== "TEST") {
      socket.emit("in_room", username, roomId, (inRoom) => {
        if (!inRoom) {
          console.log("joining room");
          socket.emit("join_room", {
            username,
            roomId,
          });
        }
      });

      socket.on("update_users", (updatedPlayers) => {
        setPlayers(updatedPlayers);
        console.log("Updated Players: ", updatedPlayers);
      });

      socket.emit("req_update_users", roomId);

      return () => {
        socket.off("update_users");
      };
    }
  }, [roomId, roomFound, username]);

  const joinRoom = (usernameValue) => {
    if (roomId === "TEST") {
      console.log("✅ Simulated join for TEST room with username:", usernameValue);
      // Update the mock players to include the new username
      const updatedPlayers = [
        { id: 1, username: usernameValue, isReady: false, items: [], name: usernameValue, activity: true },
        { id: 2, username: "TestPlayer1", isReady: true, items: [], name: "TestPlayer1", activity: true },
        { id: 3, username: "TestPlayer2", isReady: false, items: [], name: "TestPlayer2", activity: true },
      ];
      setPlayers(updatedPlayers);
      return;
    }
    
    socket.emit("join_room", {
      username: usernameValue,
      roomId,
    });
  };

  return {
    roomFound,
    players,
    solo,
    loading,
    joinRoom,
  };
};
