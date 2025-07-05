export default function ChatBubble({ message }) {
  const isAI = message.type === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} animate-fade-in`}>
      <div
        className={`px-4 py-2 rounded-xl text-white max-w-xs ${
          isAI ? "bg-green-500" : "bg-blue-600"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
