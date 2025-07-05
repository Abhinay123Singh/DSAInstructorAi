import { useState } from "react";
import ChatBubble from "./components/ChatBubble";
import "./App.css";

export default function App() {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I am your Data Structure and Algorithm Instructor. Ask me anything related to DSA!" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    const aiReply = { type: "ai", text: generateAIResponse(input) };
    setMessages((prev) => [...prev, userMessage, aiReply]);
    setInput("");
  };

  const generateAIResponse = (input) => {
    // Placeholder: replace with AI logic or backend call
    if (input.toLowerCase().includes("stack")) return "A stack is a LIFO data structure.";
    if (input.toLowerCase().includes("queue")) return "A queue is a FIFO data structure.";
    return "That's a great question! Let me find the best answer for you.";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded shadow-lg p-4 flex flex-col">
        <h2 className="text-xl font-bold text-center mb-4">DSA Instructor AI</h2>
        <div className="flex-1 space-y-2 overflow-y-auto mb-4 max-h-[400px]">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Data Structures & Algorithms..."
            className="flex-1 border px-4 py-2 rounded-l outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}