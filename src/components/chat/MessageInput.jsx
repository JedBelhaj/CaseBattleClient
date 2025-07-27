import { IoSend } from "react-icons/io5";
import { CHAT_CONSTANTS, CHAT_MESSAGES } from "@/constants/chat";

function MessageInput({ 
  value, 
  onChange, 
  onSend, 
  disabled = false,
  placeholder = CHAT_MESSAGES.PLACEHOLDER 
}) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  const handleSendClick = () => {
    onSend();
  };

  return (
    <div className="flex items-center gap-2 bg-zinc-600 p-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        maxLength={CHAT_CONSTANTS.MAX_MESSAGE_LENGTH}
        className="w-full h-8 text-white appearance-none border-none outline-none bg-transparent placeholder-zinc-400 disabled:opacity-50"
        placeholder={placeholder}
        aria-label="Chat message input"
      />
      <IoSend 
        onClick={handleSendClick}
        className={`text-2xl cursor-pointer transition-colors ${
          disabled || !value.trim() 
            ? 'text-zinc-500 cursor-not-allowed' 
            : 'text-zinc-400 hover:text-yellow-500'
        }`}
        aria-label="Send message"
      />
    </div>
  );
}

export default MessageInput;
