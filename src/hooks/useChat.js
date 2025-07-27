import { useState, useCallback } from "react";
import { CHAT_CONSTANTS, CHAT_MESSAGES } from "@/constants/chat";

export const useChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "System",
      content: CHAT_MESSAGES.WELCOME,
      timestamp: new Date(),
      isSystem: true,
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = useCallback((messageText, username = "Anonymous") => {
    if (!messageText.trim()) {
      return { success: false, error: CHAT_MESSAGES.EMPTY_MESSAGE_ERROR };
    }

    if (messageText.length > CHAT_CONSTANTS.MAX_MESSAGE_LENGTH) {
      return { success: false, error: CHAT_MESSAGES.MESSAGE_TOO_LONG };
    }

    const newMessage = {
      id: Date.now() + Math.random(),
      user: username,
      content: messageText.trim(),
      timestamp: new Date(),
      isSystem: false,
    };

    setMessages(prev => [...prev, newMessage]);
    return { success: true };
  }, []);

  const sendMessage = useCallback(() => {
    const result = addMessage(currentMessage, "You");
    if (result.success) {
      setCurrentMessage("");
    }
    return result;
  }, [currentMessage, addMessage]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const formatMessageTime = useCallback((timestamp) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  }, []);

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    isExpanded,
    isLoading,
    sendMessage,
    toggleExpanded,
    formatMessageTime,
  };
};
