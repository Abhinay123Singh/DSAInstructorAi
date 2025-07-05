
export default function ChatBubble({ message }) {
  const isAI = message.type === "ai";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs ${isAI ? "flex-row" : "flex-row-reverse space-x-reverse"}`}>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold shadow-lg ${
          isAI ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-2 border-green-400/50" : "bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-2 border-blue-400/50"
        }`}>
          {isAI ? "🤖" : "👤"}
        </div>
        
        <div className={`px-5 py-3 rounded-2xl text-white shadow-xl backdrop-blur-sm ${
          isAI 
            ? "bg-gradient-to-r from-green-500/90 to-emerald-600/90 rounded-bl-sm border border-green-400/30" 
            : "bg-gradient-to-r from-blue-600/90 to-cyan-700/90 rounded-br-sm border border-blue-400/30"
        }`}>
          <p className="text-sm leading-relaxed font-medium">{message.text}</p>
        </div>
      </div>
    </div>
  );
}
