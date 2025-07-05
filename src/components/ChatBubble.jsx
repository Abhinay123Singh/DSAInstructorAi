
export default function ChatBubble({ message }) {
  const isAI = message.type === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs ${isAI ? "flex-row" : "flex-row-reverse space-x-reverse"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
          isAI ? "bg-green-500 text-white" : "bg-blue-600 text-white"
        }`}>
          {isAI ? "🤖" : "👤"}
        </div>
        
        <div className={`px-4 py-2 rounded-2xl text-white shadow-lg ${
          isAI 
            ? "bg-gradient-to-r from-green-500 to-green-600 rounded-bl-sm" 
            : "bg-gradient-to-r from-blue-600 to-blue-700 rounded-br-sm"
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
