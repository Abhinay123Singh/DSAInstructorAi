// src/components/ChatBubble.jsx
export default function ChatBubble({ message }) {
  const isAI = message.type === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} my-1`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-lg shadow text-white ${
          isAI ? "bg-green-500" : "bg-blue-600"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
