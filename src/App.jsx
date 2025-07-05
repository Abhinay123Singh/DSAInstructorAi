
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
      "array": `📚 **Arrays - The Foundation of Data Structures**

🔹 **What is an Array?**
An array is a collection of elements stored in contiguous memory locations. Each element can be accessed using an index (position number starting from 0).

🔹 **Key Characteristics:**
• Fixed size (in most languages)
• Elements of the same data type
• Random access - O(1) time to access any element
• Cache-friendly due to memory locality

🔹 **Common Operations & Time Complexity:**
• Access: O(1) - Direct index access
• Search: O(n) - Linear search through elements
• Insertion: O(n) - May need to shift elements
• Deletion: O(n) - May need to shift elements

🔹 **Types of Arrays:**
• Static Arrays: Fixed size at compile time
• Dynamic Arrays: Resizable (like vectors in C++, ArrayList in Java)

🔹 **When to Use Arrays:**
✅ When you need fast access to elements by index
✅ When memory usage needs to be predictable
✅ For mathematical computations and matrix operations
✅ As building blocks for other data structures

🔹 **Example Use Cases:**
• Storing grades of students
• Representing images (2D arrays of pixels)
• Implementing other data structures (heaps, hash tables)

Would you like me to explain any specific array operations or algorithms?`,

      "big o": `📊 **Big O Notation - Understanding Algorithm Efficiency**

🔹 **What is Big O?**
Big O notation describes the upper bound of an algorithm's time or space complexity. It tells us how the runtime or memory usage grows as the input size increases.

🔹 **Common Time Complexities:**
• O(1) - Constant: Same time regardless of input size
• O(log n) - Logarithmic: Binary search, balanced trees
• O(n) - Linear: Single loop through data
• O(n log n) - Linearithmic: Efficient sorting algorithms
• O(n²) - Quadratic: Nested loops, bubble sort
• O(2ⁿ) - Exponential: Recursive fibonacci (naive)

🔹 **Why It Matters:**
Understanding Big O helps you choose the right algorithm for your problem size and predict performance as data grows.

Want to dive deeper into analyzing specific algorithms?`,

      "binary search": `🎯 **Binary Search - The Power of Divide & Conquer**

🔹 **How It Works:**
Binary search finds a target value in a sorted array by repeatedly dividing the search space in half.

🔹 **Algorithm Steps:**
1. Start with the middle element
2. If target equals middle, found!
3. If target < middle, search left half
4. If target > middle, search right half
5. Repeat until found or search space is empty

🔹 **Time Complexity:** O(log n)
🔹 **Space Complexity:** O(1) iterative, O(log n) recursive

🔹 **Prerequisites:**
⚠️ Array must be sorted!

🔹 **Applications:**
• Searching in databases
• Finding insertion points
• Square root calculation
• Peak finding problems

Would you like to see a code implementation?`,

      "linked list": `🔗 **Linked Lists - Dynamic Memory Management**

🔹 **Structure:**
Each node contains:
• Data: The actual value
• Pointer/Reference: Points to the next node

🔹 **Types:**
• Singly Linked: One direction traversal
• Doubly Linked: Bidirectional traversal
• Circular Linked: Last node points to first

🔹 **Time Complexities:**
• Access: O(n) - Must traverse from head
• Search: O(n) - Linear search
• Insertion: O(1) at head, O(n) at position
• Deletion: O(1) at head, O(n) at position

🔹 **Advantages:**
✅ Dynamic size
✅ Efficient insertion/deletion at beginning
✅ Memory efficient (no wasted space)

🔹 **Disadvantages:**
❌ No random access
❌ Extra memory for pointers
❌ Not cache-friendly

Ready to explore specific linked list operations?`,

      "stack": `📚 **Stack - Last In, First Out (LIFO)**

🔹 **Core Operations:**
• Push: Add element to top - O(1)
• Pop: Remove element from top - O(1)
• Peek/Top: View top element - O(1)
• isEmpty: Check if stack is empty - O(1)

🔹 **Implementation Options:**
• Array-based: Fixed size, simple
• Linked list-based: Dynamic size

🔹 **Real-World Applications:**
• Function call management (call stack)
• Undo operations in editors
• Expression evaluation and syntax parsing
• Browser back button functionality
• Depth-First Search (DFS) traversal

🔹 **Problem-Solving Patterns:**
• Parentheses matching
• Reverse Polish notation
• Monotonic stack problems

Want to explore stack-based algorithms or see implementations?`,

      "recursion": `🔄 **Recursion - Elegant Problem Solving**

🔹 **Key Components:**
• Base Case: Condition to stop recursion
• Recursive Case: Function calls itself with smaller input

🔹 **How It Works:**
Each recursive call adds a new frame to the call stack. When base case is reached, functions return in reverse order.

🔹 **Types:**
• Direct: Function calls itself
• Indirect: Functions call each other cyclically
• Tail Recursion: Recursive call is the last operation

🔹 **Common Patterns:**
• Divide & Conquer: Merge sort, quick sort
• Tree Traversal: DFS, tree operations
• Backtracking: N-queens, sudoku solver
• Mathematical: Factorial, fibonacci

🔹 **Time/Space Analysis:**
Often O(n) space due to call stack overhead.

Ready to master recursive thinking with specific examples?`,

      "sorting": `🎲 **Sorting Algorithms - Organizing Data Efficiently**

🔹 **Popular Algorithms:**

**Simple Sorts:**
• Bubble Sort: O(n²) - Educational, inefficient
• Selection Sort: O(n²) - Unstable, simple
• Insertion Sort: O(n²) - Good for small/nearly sorted

**Efficient Sorts:**
• Merge Sort: O(n log n) - Stable, divide & conquer
• Quick Sort: O(n log n) avg - In-place, cache-efficient
• Heap Sort: O(n log n) - In-place, not stable

**Special Purpose:**
• Counting Sort: O(n+k) - For integers in range
• Radix Sort: O(d×n) - For fixed-width data
• Bucket Sort: O(n) avg - For uniformly distributed data

🔹 **Choosing the Right Sort:**
• Stability needed? → Merge Sort
• Memory constrained? → Heap Sort
• Average case performance? → Quick Sort
• Small dataset? → Insertion Sort

Which sorting algorithm interests you most?`
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // More intelligent fallback responses
    if (lowerMessage.includes("what") || lowerMessage.includes("explain") || lowerMessage.includes("how")) {
      return `🤔 **I'd love to help you learn!** 

I can provide detailed explanations about:
• **Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Hash Tables
• **Algorithms**: Sorting, Searching, Graph Traversal, Dynamic Programming
• **Concepts**: Time/Space Complexity, Big O Notation, Recursion

Try asking something like:
"What is an array?" or "Explain binary search" or "How does recursion work?"

What specific topic would you like to explore? 🚀`;
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
