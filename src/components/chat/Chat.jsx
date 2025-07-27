import { IoIosArrowDown } from "react-icons/io";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { useChat } from "@/hooks/useChat";
import { CHAT_MESSAGES, CHAT_STYLES } from "@/constants/chat";

function Chat() {
  const {
    messages,
    currentMessage,
    setCurrentMessage,
    isExpanded,
    sendMessage,
    toggleExpanded,
    formatMessageTime,
  } = useChat();

  const handleSendMessage = () => {
    const result = sendMessage();
    if (!result.success) {
      // TODO: Show error message (toast notification)
      console.warn(result.error);
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Fixed Header */}
      <header className="text-yellow-500 font-oxanium bg-black p-4 flex justify-between items-center">
        <h3>{CHAT_MESSAGES.HEADER_TITLE}</h3>
        <button
          onClick={toggleExpanded}
          className={`hover:scale-125 transition-transform ${CHAT_STYLES.TRANSITION_DURATION} cursor-pointer text-lg ${
            isExpanded ? "-rotate-180" : ""
          }`}
          aria-label={isExpanded ? "Collapse chat" : "Expand chat"}
        >
          <IoIosArrowDown />
        </button>
      </header>

      {/* Scrollable Messages Container */}
      <div
        className={`overflow-hidden transition-all ${CHAT_STYLES.TRANSITION_DURATION} ${
          isExpanded ? CHAT_STYLES.EXPANDED_HEIGHT : CHAT_STYLES.COLLAPSED_HEIGHT
        }`}
      >
        <div className="flex-1 overflow-auto h-full">
          <Messages 
            messages={messages} 
            formatTime={formatMessageTime}
          />
        </div>

        {/* Fixed Input Field */}
        {isExpanded && (
          <MessageInput
            value={currentMessage}
            onChange={setCurrentMessage}
            onSend={handleSendMessage}
            placeholder={CHAT_MESSAGES.PLACEHOLDER}
          />
        )}
      </div>
    </div>
  );
}

export default Chat;
