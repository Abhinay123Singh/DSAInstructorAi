import React, { useState } from "react";
import ChatBubble from "./components/ChatBubble";

export default function App() {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I am your Data Structure and Algorithm Instructor. Ask me anything related to DSA!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { type: "user", text: input }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: "ai", text: "Here's an answer to your DSA query!" }]);
    }, 1000);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-indigo-700">🤖 DSA Instructor AI</h1>

        <div className="h-96 overflow-y-auto space-y-2 px-2 scrollbar-thin">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
        </div>

        <div className="flex gap-2">
          <input
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            type="text"
            placeholder="Ask about Data Structures & Algorithms..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
