import { useEffect, useRef } from "react";

function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full text-zinc-300 overflow-auto flex flex-col justify-end">
      <p className="text-center mb-10">Welcome to chat!</p>
      {messages.map((msg, index) => (
        <div key={index} className="bg-zinc-700 m-1 p-2">
          <div className="flex w-full gap-2 items-center">
            <p className="text-zinc-900 text-xs leading-none">{msg.date}</p>
            <p className="text-yellow-500 font-bold">{msg.user}:</p>
            <p>{msg.content}</p>
          </div>
        </div>
      ))}
      {/* Invisible div to track the bottom of the message list */}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
