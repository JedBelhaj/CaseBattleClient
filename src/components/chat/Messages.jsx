import { useEffect, useRef } from "react";
import { CHAT_CONSTANTS } from "@/constants/chat";

function Messages({ messages, formatTime }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: CHAT_CONSTANTS.SCROLL_BEHAVIOR 
    });
  }, [messages]);

  if (!messages || messages.length === 0) {
    return (
      <div className="h-full text-zinc-300 flex items-center justify-center">
        <p className="text-zinc-500">No messages yet...</p>
      </div>
    );
  }

  return (
    <div className="h-full text-zinc-300 overflow-auto flex flex-col justify-end">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className={`m-1 p-2 rounded ${
            msg.isSystem 
              ? 'bg-zinc-800 text-center text-zinc-400 italic' 
              : 'bg-zinc-700'
          }`}
        >
          {msg.isSystem ? (
            <p>{msg.content}</p>
          ) : (
            <div className="flex w-full gap-2 items-center">
              <p className="text-zinc-400 text-xs leading-none flex-shrink-0">
                {formatTime(msg.timestamp)}
              </p>
              <p className="text-yellow-500 font-bold flex-shrink-0">
                {msg.user}:
              </p>
              <p className="break-words">{msg.content}</p>
            </div>
          )}
        </div>
      ))}
      {/* Invisible div to track the bottom of the message list */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
