import * as React from "react";
import { useState } from "react";
import axios from "axios";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

const BASE_URL = (import.meta.env.VITE_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

export default function ChatbotPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hi! I'm Wolfie 🐺🐾 Your loyal husky friend for Happy Tails.",
    },
  ]);

  const suggestedQuestions = [
  "How do I adopt a pet?",
  "Show me dogs",
  "Show me cats",
  "Which animals have medical history?"
];

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const url = `${BASE_URL}/api/chat`;

      const response = await axios.post(url, {
        message: messageText,
      });

      const data = response.data;

      const botMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply ?? "Sorry, I couldn't get a response right now.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat request failed:", error);

      const errorMessage: Message = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Wolfie couldn't connect to the server right now. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-xl flex flex-col items-center justify-center font-semibold transition transform hover:scale-105"
      >
        <span className="text-2xl animate-bounce">🐺</span>
        <span className="text-[9px] leading-none">Hi!</span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl overflow-hidden border border-green-100">
          <div className="bg-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl animate-pulse">
                🐺
              </div>
              <div>
                <h1 className="text-lg font-bold">Wolfie</h1>
                <p className="text-xs opacity-90">Happy Tails Husky Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-xl leading-none hover:opacity-80"
            >
              ×
            </button>
          </div>

          <div className="bg-green-50 px-4 py-2 border-b border-green-100">
            <p className="text-xs text-green-800">Wolfie is live 🐾</p>
          </div>

          <div className="h-[360px] overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex items-end gap-2 max-w-[85%]">
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-base shrink-0 border border-green-200">
                      🐺
                    </div>
                  )}

                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow whitespace-pre-line ${
                      message.sender === "user"
                        ? "bg-green-600 text-white rounded-br-sm"
                        : "bg-white text-gray-800 border rounded-bl-sm"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-end gap-2 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-base shrink-0 border border-green-200">
                    🐺
                  </div>

                  <div className="bg-white text-gray-800 border rounded-2xl rounded-bl-sm px-4 py-3 shadow">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">Wolfie is typing</span>
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-4 pt-3 pb-2 bg-white border-t border-green-100">
            <div className="flex flex-wrap gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => sendMessage(question)}
                  className="text-xs bg-green-100 hover:bg-green-200 text-green-900 px-3 py-1.5 rounded-full transition"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-4 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Wolfie something..."
              className="flex-1 border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-500 text-sm"
            />
            <button
              onClick={handleSend}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-medium transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}