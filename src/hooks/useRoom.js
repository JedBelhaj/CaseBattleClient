import { useState, useEffect } from "react";
import socket from "@/services/socket";
import { ROOM_CONSTANTS } from "@/constants/room";

export const useRoom = (roomId, username) => {
  // Initialize roomFound based on whether it's a solo game
  const [roomFound, setRoomFound] = useState(roomId === ROOM_CONSTANTS.SOLO_ROOM_ID);
  const [players, setPlayers] = useState([]);
  const [solo, setSolo] = useState(roomId === ROOM_CONSTANTS.SOLO_ROOM_ID);
  const [loading, setLoading] = useState(!roomId || roomId !== ROOM_CONSTANTS.SOLO_ROOM_ID);

  useEffect(() => {
    if (!roomId) {
      console.warn("No roomId provided");
      setLoading(false);
      return;
    }

    if (roomId === ROOM_CONSTANTS.SOLO_ROOM_ID) {
      setSolo(true);
      setRoomFound(true);
      setLoading(false);
      return;
    }

    setSolo(false);
    setRoomFound(false); // Reset for non-solo rooms
    setLoading(true);

    socket.emit("room_exist", roomId, (exists) => {
      setRoomFound(exists);
      setLoading(false);
    });

    if (roomFound && username) {
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
