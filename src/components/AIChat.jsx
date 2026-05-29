import { useState, useRef, useEffect } from "react";

export default function AIChat({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://gawbhkyquegtbrhlmlhu.supabase.co/functions/v1/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        sender: "assistant", 
        text: data.text || "抱歉，出了点问题。" 
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { 
        sender: "assistant", 
        text: "AI服务暂时不可用，请填写咨询表单，我们的顾问会尽快联系您。" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed bottom-24 right-6 z-50 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        {/* 头部 */}
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-bold">AI留学顾问 · 小赵</h3>
              <p className="text-xs text-emerald-100">基于DeepSeek AI</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200 text-2xl leading-none">
            ×
          </button>
        </div>

        {/* 消息区域 */}
        <div className="h-96 overflow-y-auto p-4 bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p className="text-4xl mb-3">🎓</p>
              <p className="text-sm font-medium text-gray-600">我是小赵，你的留学顾问</p>
              <p className="text-xs mt-2">试试问我：</p>
              <div className="mt-3 space-y-1 text-xs">
                <p>• 马来西亚留学一年多少钱？</p>
                <p>• 马来亚大学怎么样？</p>
                <p>• 签证好办吗？</p>
                <p>• 没有雅思能申请吗？</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-2xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="p-4 bg-white border-t">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="输入问题，按回车发送..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-emerald-500 text-sm text-gray-900 bg-white"
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700 disabled:opacity-50"
            >
              发送
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            💡 AI实时回答，基于DeepSeek
          </p>
        </div>
      </div>
    </>
  );
}