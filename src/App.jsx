
import React, { useState, useEffect, useRef } from "react";
import ChatBubble from "./components/ChatBubble";

export default function App() {
  const [messages, setMessages] = useState([
    { type: "ai", text: "Hello! I am your Data Structure and Algorithm Instructor. Ask me anything related to DSA!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What is Big O notation?",
    "Explain binary search",
    "What are linked lists?",
    "How does a stack work?",
    "What is recursion?",
    "Explain sorting algorithms"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const responses = {
      "big o": "Big O notation describes the time complexity of algorithms. It helps us understand how the runtime grows as input size increases. Common complexities include O(1), O(log n), O(n), O(n²), etc.",
      "binary search": "Binary search is an efficient algorithm that finds a target value in a sorted array by repeatedly dividing the search interval in half. Time complexity: O(log n).",
      "linked list": "A linked list is a data structure where elements are stored in nodes, and each node contains data and a pointer to the next node. Unlike arrays, elements aren't stored in contiguous memory.",
      "stack": "A stack is a LIFO (Last In, First Out) data structure. Elements are added and removed from the same end called the 'top'. Main operations: push, pop, peek.",
      "recursion": "Recursion is a programming technique where a function calls itself to solve smaller instances of the same problem. It needs a base case to stop the recursion.",
      "sorting": "Common sorting algorithms include Bubble Sort O(n²), Merge Sort O(n log n), Quick Sort O(n log n), and Heap Sort O(n log n). Each has different trade-offs."
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    return "That's a great question! In DSA, we focus on efficient problem-solving. Could you be more specific about which data structure or algorithm you'd like to learn about?";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: "user", text: userMessage }]);
    setInput("");
    setIsTyping(true);
    setShowSuggestions(false);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { type: "ai", text: aiResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickQuestion = (question) => {
    setInput(question);
    setShowSuggestions(false);
  };

  const clearChat = () => {
    setMessages([
      { type: "ai", text: "Hello! I am your Data Structure and Algorithm Instructor. Ask me anything related to DSA!" }
    ]);
    setShowSuggestions(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-800 shadow-xl rounded-lg p-6 space-y-4 border border-gray-700">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-100">🤖 DSA Instructor AI</h1>
          <button
            onClick={clearChat}
            className="text-gray-400 hover:text-gray-200 text-sm px-3 py-1 rounded-md hover:bg-gray-700 transition"
          >
            Clear Chat
          </button>
        </div>

        {showSuggestions && (
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Quick Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1 rounded-full transition transform hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="h-96 overflow-y-auto space-y-2 px-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-green-500 text-white px-4 py-2 rounded-xl max-w-xs">
                <div className="flex items-center space-x-1">
                  <span>AI is thinking</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              className="flex-1 px-4 py-2 border border-gray-600 bg-gray-700 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-400 transition"
              type="text"
              placeholder="Ask about Data Structures & Algorithms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition transform hover:scale-105"
            >
              {isTyping ? "..." : "Send"}
            </button>
          </div>
          
          <div className="text-xs text-gray-400 text-center">
            💡 Tip: Ask about specific algorithms, data structures, or complexity analysis!
          </div>
        </div>
      </div>
    </div>
  );
}
