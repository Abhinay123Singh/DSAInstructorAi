
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
    "Explain sorting algorithms",
    "What are hash tables?",
    "How do heaps work?",
    "What is dynamic programming?",
    "Explain graph algorithms",
    "What are trees?",
    "How does BFS differ from DFS?"
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
• Multi-dimensional: 2D arrays, matrices

🔹 **Array Algorithms:**
• Two Pointers: For pair problems, palindromes
• Sliding Window: For subarray problems
• Prefix Sum: For range query problems
• Kadane's Algorithm: Maximum subarray sum

🔹 **When to Use Arrays:**
✅ When you need fast access to elements by index
✅ When memory usage needs to be predictable
✅ For mathematical computations and matrix operations
✅ As building blocks for other data structures

🔹 **Common Interview Problems:**
• Two Sum, Three Sum
• Maximum Subarray (Kadane's)
• Rotate Array, Merge Sorted Arrays
• Dutch National Flag Problem

Would you like me to explain any specific array operations or algorithms?`,

      "big o": `📊 **Big O Notation - Understanding Algorithm Efficiency**

🔹 **What is Big O?**
Big O notation describes the upper bound of an algorithm's time or space complexity. It tells us how the runtime or memory usage grows as the input size increases.

🔹 **Common Time Complexities (Best to Worst):**
• O(1) - Constant: Array access, hash table lookup
• O(log n) - Logarithmic: Binary search, balanced tree operations
• O(n) - Linear: Single loop, linear search
• O(n log n) - Linearithmic: Merge sort, heap sort
• O(n²) - Quadratic: Nested loops, bubble sort
• O(n³) - Cubic: Triple nested loops
• O(2ⁿ) - Exponential: Recursive fibonacci (naive)
• O(n!) - Factorial: Traveling salesman (brute force)

🔹 **Space Complexity:**
• O(1) - Constant extra space
• O(n) - Linear extra space (most algorithms)
• O(log n) - Recursive call stack space

🔹 **Analysis Rules:**
• Drop constants: O(2n) → O(n)
• Drop lower order terms: O(n² + n) → O(n²)
• Different inputs use different variables: O(a + b)

🔹 **Why It Matters:**
Understanding Big O helps you choose the right algorithm for your problem size and predict performance as data grows.

Want to dive deeper into analyzing specific algorithms?`,

      "binary search": `🎯 **Binary Search - The Power of Divide & Conquer**

🔹 **How It Works:**
Binary search finds a target value in a sorted array by repeatedly dividing the search space in half.

🔹 **Algorithm Steps:**
1. Set left = 0, right = n-1
2. While left ≤ right:
   - Calculate mid = left + (right - left) / 2
   - If arr[mid] == target, return mid
   - If arr[mid] < target, left = mid + 1
   - If arr[mid] > target, right = mid - 1
3. Return -1 (not found)

🔹 **Complexity:**
• Time: O(log n) - Halves search space each iteration
• Space: O(1) iterative, O(log n) recursive

🔹 **Prerequisites:**
⚠️ Array must be sorted!

🔹 **Variants:**
• Find first/last occurrence
• Find insertion position
• Search in rotated sorted array
• Find peak element

🔹 **Template Pattern:**
Most binary search problems follow: while (left < right) pattern with careful boundary handling.

🔹 **Applications:**
• Database indexing
• Finding square roots
• Capacity/resource allocation problems

Would you like to see code implementations or explore variants?`,

      "linked list": `🔗 **Linked Lists - Dynamic Memory Management**

🔹 **Structure:**
Each node contains:
• Data: The actual value
• Pointer/Reference: Points to the next node

🔹 **Types:**
• **Singly Linked:** One direction traversal
• **Doubly Linked:** Bidirectional with prev/next pointers
• **Circular Linked:** Last node points to first
• **Multiply Linked:** Multiple pointers per node

🔹 **Time Complexities:**
• Access: O(n) - Must traverse from head
• Search: O(n) - Linear search
• Insertion: O(1) at head/tail, O(n) at position
• Deletion: O(1) at head, O(n) at position

🔹 **Advantages:**
✅ Dynamic size - grows/shrinks during runtime
✅ Efficient insertion/deletion at beginning
✅ Memory efficient - no wasted space

🔹 **Disadvantages:**
❌ No random access - must traverse sequentially
❌ Extra memory for pointers
❌ Not cache-friendly - nodes scattered in memory

🔹 **Common Patterns:**
• **Two Pointers:** Fast/slow for cycle detection
• **Dummy Node:** Simplifies edge cases
• **Reverse:** Iterative and recursive approaches

🔹 **Classic Problems:**
• Reverse linked list
• Detect cycle (Floyd's algorithm)
• Merge two sorted lists
• Find middle node
• Remove nth node from end

Ready to explore specific linked list algorithms?`,

      "stack": `📚 **Stack - Last In, First Out (LIFO)**

🔹 **Core Operations:**
• **Push:** Add element to top - O(1)
• **Pop:** Remove element from top - O(1)
• **Peek/Top:** View top element - O(1)
• **isEmpty:** Check if stack is empty - O(1)

🔹 **Implementation Options:**
• **Array-based:** Fixed size, simple implementation
• **Linked list-based:** Dynamic size, more complex

🔹 **Real-World Applications:**
• Function call management (call stack)
• Undo operations in text editors
• Expression evaluation and syntax parsing
• Browser back button functionality
• Depth-First Search (DFS) traversal

🔹 **Problem-Solving Patterns:**
• **Parentheses Matching:** Valid brackets, balanced expressions
• **Expression Evaluation:** Infix to postfix, calculator
• **Monotonic Stack:** Next greater/smaller element
• **Backtracking:** Store states for exploration

🔹 **Classic Stack Problems:**
• Valid Parentheses
• Daily Temperatures (monotonic stack)
• Largest Rectangle in Histogram
• Evaluate Reverse Polish Notation
• Min Stack (with O(1) min operation)

🔹 **Stack vs Queue:**
Stack: LIFO - Recent items processed first
Queue: FIFO - Oldest items processed first

Want to explore stack-based algorithms or see implementations?`,

      "queue": `🚶‍♂️ **Queue - First In, First Out (FIFO)**

🔹 **Core Operations:**
• **Enqueue:** Add element to rear - O(1)
• **Dequeue:** Remove element from front - O(1)
• **Front:** View front element - O(1)
• **isEmpty:** Check if queue is empty - O(1)

🔹 **Types:**
• **Simple Queue:** Basic FIFO structure
• **Circular Queue:** Efficient space usage
• **Priority Queue:** Elements with priorities
• **Deque:** Double-ended queue (insert/delete both ends)

🔹 **Implementation:**
• Array-based with front/rear pointers
• Linked list-based for dynamic size

🔹 **Applications:**
• CPU scheduling in operating systems
• Breadth-First Search (BFS) traversal
• Handling requests in web servers
• Print queue management
• Buffer for data streams

🔹 **BFS Pattern:**
Queue is essential for level-order traversal and shortest path problems in unweighted graphs.

🔹 **Common Problems:**
• Sliding Window Maximum (using deque)
• Binary Tree Level Order Traversal
• Rotting Oranges (multi-source BFS)
• Number of Islands (BFS approach)

Ready to explore queue applications in graph algorithms?`,

      "tree": `🌳 **Trees - Hierarchical Data Organization**

🔹 **Basic Concepts:**
• **Root:** Top node with no parent
• **Leaf:** Node with no children
• **Height:** Longest path from root to leaf
• **Depth:** Distance from root to node
• **Subtree:** Tree rooted at any node

🔹 **Binary Trees:**
Each node has at most 2 children (left, right)
• **Full:** Every node has 0 or 2 children
• **Complete:** All levels filled except possibly last
• **Perfect:** All internal nodes have 2 children
• **Balanced:** Height difference ≤ 1 for all nodes

🔹 **Tree Traversals:**
• **Inorder:** Left → Root → Right (gives sorted order in BST)
• **Preorder:** Root → Left → Right (good for copying)
• **Postorder:** Left → Right → Root (good for deletion)
• **Level Order:** BFS traversal using queue

🔹 **Binary Search Tree (BST):**
• Left subtree < root < right subtree
• Search, Insert, Delete: O(log n) average, O(n) worst
• Inorder traversal gives sorted sequence

🔹 **Balanced Trees:**
• **AVL Tree:** Self-balancing, height difference ≤ 1
• **Red-Black Tree:** Color-based balancing rules
• **B-Trees:** Multi-way trees for databases

🔹 **Common Tree Problems:**
• Maximum depth/height
• Validate BST
• Lowest Common Ancestor
• Tree serialization/deserialization
• Path sum problems

Which tree concept would you like to explore deeper?`,

      "graph": `📊 **Graphs - Modeling Relationships and Networks**

🔹 **Graph Components:**
• **Vertices (Nodes):** Individual entities
• **Edges:** Connections between vertices
• **Weight:** Cost/distance of an edge
• **Degree:** Number of edges connected to a vertex

🔹 **Types of Graphs:**
• **Directed vs Undirected:** One-way vs two-way edges
• **Weighted vs Unweighted:** Edges with/without costs
• **Cyclic vs Acyclic:** Contains cycles or not
• **Connected vs Disconnected:** All nodes reachable or not

🔹 **Graph Representations:**
• **Adjacency Matrix:** 2D array - O(V²) space, O(1) edge lookup
• **Adjacency List:** Array of lists - O(V+E) space, efficient for sparse graphs
• **Edge List:** List of all edges - O(E) space

🔹 **Graph Traversal Algorithms:**
• **DFS (Depth-First Search):** Uses stack, explores deep
• **BFS (Breadth-First Search):** Uses queue, explores level by level

🔹 **Shortest Path Algorithms:**
• **Dijkstra's:** Single source, non-negative weights - O((V+E)log V)
• **Bellman-Ford:** Single source, handles negative weights - O(VE)
• **Floyd-Warshall:** All pairs shortest path - O(V³)

🔹 **Other Important Algorithms:**
• **Topological Sort:** Ordering for DAGs
• **Union-Find:** For cycle detection, MST
• **Minimum Spanning Tree:** Kruskal's, Prim's algorithms

🔹 **Applications:**
• Social networks, GPS navigation
• Web crawling, dependency resolution
• Network flow, matching problems

Which graph algorithm interests you most?`,

      "hash": `🔍 **Hash Tables - Fast Key-Value Storage**

🔹 **Core Concept:**
Hash tables use a hash function to map keys to array indices, providing average O(1) access time.

🔹 **Hash Function Properties:**
• **Deterministic:** Same input → same output
• **Uniform Distribution:** Spreads keys evenly
• **Fast Computation:** Quick to calculate
• **Avalanche Effect:** Small input changes → big output changes

🔹 **Collision Resolution:**
• **Chaining:** Store multiple values in linked lists
• **Open Addressing:** Find another empty slot
  - Linear Probing: Check next slot
  - Quadratic Probing: Check i² slots away
  - Double Hashing: Use second hash function

🔹 **Time Complexity:**
• **Average Case:** O(1) for search, insert, delete
• **Worst Case:** O(n) when all keys hash to same bucket
• **Load Factor:** n/m (items/buckets) affects performance

🔹 **Applications:**
• Database indexing
• Caching mechanisms
• Symbol tables in compilers
• Removing duplicates
• Implementing sets and maps

🔹 **Hash Table Problems:**
• Two Sum (using hash map)
• Group Anagrams
• Longest Substring Without Repeating Characters
• Design HashMap/HashSet

🔹 **Real Implementations:**
• Python: dict, set
• Java: HashMap, HashSet
• C++: unordered_map, unordered_set

Want to explore hash function design or collision handling?`,

      "heap": `⛰️ **Heaps - Priority-Based Data Structure**

🔹 **Heap Properties:**
• **Complete Binary Tree:** All levels filled except possibly last
• **Heap Property:** Parent-child relationship maintained
  - Max Heap: Parent ≥ children
  - Min Heap: Parent ≤ children

🔹 **Core Operations:**
• **Insert:** Add element, bubble up - O(log n)
• **Extract-Max/Min:** Remove root, bubble down - O(log n)
• **Peek:** View root element - O(1)
• **Heapify:** Convert array to heap - O(n)

🔹 **Array Representation:**
For node at index i:
• Left child: 2i + 1
• Right child: 2i + 2
• Parent: (i-1)/2

🔹 **Applications:**
• **Priority Queues:** Process highest priority first
• **Heap Sort:** O(n log n) sorting algorithm
• **Dijkstra's Algorithm:** Shortest path finding
• **Huffman Coding:** Data compression
• **Task Scheduling:** Operating systems

🔹 **Common Heap Problems:**
• Kth Largest/Smallest Element
• Merge K Sorted Lists
• Top K Frequent Elements
• Find Median from Data Stream
• Sliding Window Maximum

🔹 **Heap vs Other Structures:**
• Heap vs BST: Faster insertion, no ordering guarantee
• Heap vs Array: Faster min/max access
• Heap vs Queue: Priority-based vs FIFO

🔹 **Advanced Heaps:**
• Fibonacci Heap: Better for decrease-key operations
• Binomial Heap: Efficient merge operations

Which heap application would you like to explore?`,

      "recursion": `🔄 **Recursion - Elegant Problem Solving**

🔹 **Key Components:**
• **Base Case:** Condition to stop recursion (prevents infinite loops)
• **Recursive Case:** Function calls itself with smaller/simpler input
• **Progress:** Each call must move toward base case

🔹 **How It Works:**
Each recursive call adds a new frame to the call stack. When base case is reached, functions return in reverse order (stack unwinding).

🔹 **Types of Recursion:**
• **Direct:** Function calls itself
• **Indirect:** Functions call each other cyclically
• **Tail Recursion:** Recursive call is the last operation
• **Tree Recursion:** Multiple recursive calls (like fibonacci)

🔹 **Recursion Patterns:**
• **Divide & Conquer:** Break problem into smaller subproblems
  - Merge Sort, Quick Sort, Binary Search
• **Backtracking:** Try all possibilities, undo if needed
  - N-Queens, Sudoku Solver, Generate Parentheses
• **Tree Traversal:** Navigate tree structures
  - Inorder, Preorder, Postorder

🔹 **Time/Space Analysis:**
• Time depends on number of recursive calls
• Space: O(h) where h is maximum call stack depth
• Tree recursion often leads to exponential time

🔹 **Common Recursive Problems:**
• Factorial, Fibonacci sequence
• Tree traversals and operations
• Permutations and combinations
• Palindrome checking
• Tower of Hanoi

🔹 **Recursion vs Iteration:**
• Recursion: More elegant, easier to understand
• Iteration: More efficient (no call stack overhead)

🔹 **Optimization Techniques:**
• **Memoization:** Cache results to avoid recomputation
• **Tail Call Optimization:** Some languages optimize tail recursion

Ready to master recursive thinking with specific examples?`,

      "sorting": `🎲 **Sorting Algorithms - Organizing Data Efficiently**

🔹 **Comparison-Based Sorts:**

**Simple Sorts (O(n²)):**
• **Bubble Sort:** Repeatedly swap adjacent elements
• **Selection Sort:** Find minimum, swap with first
• **Insertion Sort:** Insert each element in correct position

**Efficient Sorts (O(n log n)):**
• **Merge Sort:** Divide, sort, merge - stable, consistent performance
• **Quick Sort:** Choose pivot, partition - in-place, cache-efficient
• **Heap Sort:** Build heap, extract max - in-place, not stable

🔹 **Non-Comparison Sorts:**
• **Counting Sort:** O(n+k) - for integers in small range
• **Radix Sort:** O(d×n) - sort by digits/characters
• **Bucket Sort:** O(n) avg - for uniformly distributed data

🔹 **Sorting Properties:**
• **Stable:** Equal elements maintain relative order
• **In-place:** Uses O(1) extra space
• **Adaptive:** Performs better on partially sorted data

🔹 **Choosing the Right Sort:**
• **Stability needed?** → Merge Sort
• **Memory constrained?** → Heap Sort or Quick Sort
• **Average performance?** → Quick Sort
• **Small dataset?** → Insertion Sort
• **Nearly sorted?** → Insertion Sort (adaptive)
• **Integer range known?** → Counting/Radix Sort

🔹 **Sorting in Practice:**
• Most libraries use hybrid approaches (Timsort, Introsort)
• Consider data characteristics and constraints
• Quick Sort with random pivot for average case

🔹 **Advanced Sorting:**
• External sorting for data larger than memory
• Parallel sorting algorithms
• Online sorting algorithms

Which sorting algorithm would you like to explore in detail?`,

      "dynamic programming": `💎 **Dynamic Programming - Optimizing Through Memorization**

🔹 **Core Principles:**
• **Overlapping Subproblems:** Same subproblems solved multiple times
• **Optimal Substructure:** Optimal solution contains optimal subsolutions
• **Memoization:** Top-down approach with caching
• **Tabulation:** Bottom-up approach building solutions

🔹 **DP Approaches:**
• **Top-Down (Memoization):** Recursive with cache
• **Bottom-Up (Tabulation):** Iterative, fill table

🔹 **DP Patterns:**
• **Linear DP:** 1D problems (Fibonacci, House Robber)
• **Grid DP:** 2D problems (Unique Paths, Min Path Sum)
• **Interval DP:** Problems on ranges (Matrix Chain Multiplication)
• **Tree DP:** Problems on trees (Diameter, Maximum Path Sum)
• **Digit DP:** Problems with digit constraints
• **Bitmask DP:** Problems with subsets

🔹 **Classic DP Problems:**
• **Fibonacci Sequence:** Introduction to DP
• **0/1 Knapsack:** Include/exclude decisions
• **Longest Common Subsequence:** String matching
• **Edit Distance:** String transformation
• **Coin Change:** Making change with minimum coins
• **Longest Increasing Subsequence:** Subsequence optimization

🔹 **DP Optimization:**
• **Space Optimization:** Reduce 2D to 1D when possible
• **Rolling Array:** Keep only necessary previous states
• **State Compression:** Use bitmasks for subset states

🔹 **When to Use DP:**
✅ Problem has overlapping subproblems
✅ Optimal substructure exists
✅ Recursive solution has exponential time complexity

🔹 **DP vs Other Approaches:**
• DP vs Greedy: DP guarantees optimal, greedy may not
• DP vs Backtracking: DP avoids recomputation

Ready to solve some classic DP problems step by step?`
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // More intelligent fallback responses
    if (lowerMessage.includes("what") || lowerMessage.includes("explain") || lowerMessage.includes("how")) {
      return `🤔 **I'd love to help you learn DSA!** 

I can provide comprehensive explanations about:

**📚 Data Structures:**
• Arrays, Linked Lists, Stacks, Queues
• Trees (Binary, BST, AVL, Red-Black)
• Graphs (Directed/Undirected, Weighted)
• Hash Tables, Heaps, Tries

**⚡ Algorithms:**
• Sorting (Quick, Merge, Heap, Counting, Radix)
• Searching (Binary Search, DFS, BFS)
• Graph Algorithms (Dijkstra, Bellman-Ford, Topological Sort)
• Dynamic Programming, Greedy Algorithms
• Divide & Conquer, Backtracking

**🎯 Core Concepts:**
• Time/Space Complexity Analysis
• Big O, Omega, Theta Notation
• Recursion and Mathematical Induction
• Algorithm Design Patterns

**💡 Try asking:**
"What is an array and its time complexities?"
"Explain merge sort step by step"
"How does Dijkstra's algorithm work?"
"What is dynamic programming with examples?"

What specific DSA topic would you like to master? 🚀`;
    }
    
    // Enhanced keyword matching for broader coverage
    const keywords = {
      "bfs": "breadth first search",
      "dfs": "depth first search", 
      "dijkstra": "dijkstra",
      "dp": "dynamic programming",
      "trie": "trie",
      "avl": "tree",
      "red black": "tree",
      "priority queue": "heap",
      "fibonacci": "recursion",
      "kadane": "array",
      "sliding window": "array",
      "two pointer": "array",
      "backtrack": "recursion",
      "greedy": "greedy algorithm",
      "memoization": "dynamic programming"
    };
    
    for (const [keyword, topic] of Object.entries(keywords)) {
      if (lowerMessage.includes(keyword)) {
        return responses[topic] || `🤔 That's an interesting topic about ${topic}! Could you be more specific about what aspect you'd like to learn?`;
      }
    }
    
    return `🤔 **Great question!** I'm here to help you master Data Structures and Algorithms! 

Could you be more specific about which topic you'd like to explore? For example:
• "Explain arrays and their complexities"
• "How does binary search work?"
• "What's the difference between DFS and BFS?"
• "Teach me about dynamic programming"

The more specific your question, the more detailed explanation I can provide! 🎯`;
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-800 to-green-900 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-purple-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-6 space-y-5 border border-green-500/20">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            🤖 DSA Instructor AI
          </h1>

          <button
            onClick={clearChat}
            className="text-xs px-4 py-2 rounded-lg bg-green-900/50 text-green-200 hover:bg-blue-800/70 border border-green-500/30 transition hover:scale-105"
          >
            🔄 Reset
          </button>
        </div>

        {showSuggestions && (
          <div className="bg-blue-900/40 backdrop-blur-sm rounded-xl p-5 border border-blue-600/40 shadow-inner">
            <h3 className="text-sm font-semibold text-emerald-300 mb-3 flex items-center">
              ✨ Quick Questions to Get Started:
            </h3>
            <div className="flex flex-wrap gap-3">
              {quickQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickQuestion(question)}
                  className="text-xs bg-gradient-to-tr from-blue-700 to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white px-4 py-2 rounded-full shadow-md hover:shadow-emerald-500/40 transition-transform transform hover:scale-105"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="h-96 overflow-y-auto space-y-3 px-3 scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-gray-800 rounded-xl border border-emerald-600/20 bg-black/10">
          {messages.map((msg, idx) => (
            <ChatBubble key={idx} message={msg} />
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 text-white text-sm animate-pulse px-4">
              <span>AI is thinking</span>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <input
              className="flex-1 px-5 py-3 border border-blue-600/40 bg-blue-900/80 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400 transition-all duration-200 shadow-inner"
              type="text"
              placeholder="💬 Ask about Data Structures & Algorithms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={isTyping}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 text-darkblue px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isTyping ? "⏳" : "🚀 Send"}
            </button>
          </div>
          <div className="text-xs text-black-1100/90 text-center bg-black-1100/30 py-2 px-4 rounded-lg border border-black-1100/40">
            💡 Pro Tip: Try asking about trees, graphs, or dynamic programming.
          </div>
        </div>
      </div>
    </div>
  );
}
