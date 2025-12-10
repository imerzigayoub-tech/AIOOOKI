import React, { useState, useRef, useEffect } from 'react';
import { sendMessageToGemini } from '../services/gemini';
import { ChatState, Message } from '../types';

const ChatWidget: React.FC = () => {
  const [state, setState] = useState<ChatState>({
    isOpen: false,
    messages: [{ role: 'model', text: 'Greetings. I am AIOOOKI. How may I assist your design journey today?' }],
    isLoading: false,
  });
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setState(prev => ({ ...prev, isOpen: !prev.isOpen }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || state.isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true
    }));
    setInput('');

    const responseText = await sendMessageToGemini(state.messages, input);

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, { role: 'model', text: responseText }],
      isLoading: false
    }));
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end font-sans">
      {state.isOpen && (
        <div className="mb-4 w-80 md:w-96 bg-neutral-900 border border-neutral-800 rounded-lg shadow-2xl overflow-hidden animate-fade-in-up transition-all">
          <div className="bg-neutral-800 p-3 border-b border-neutral-700 flex justify-between items-center">
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-300 font-lemon">AIOOOKI AI</span>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white">&times;</button>
          </div>
          
          <div className="h-80 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-black/90 backdrop-blur-md">
            {state.messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] p-3 text-sm rounded-lg ${
                    msg.role === 'user' 
                      ? 'bg-white text-black rounded-br-none' 
                      : 'bg-neutral-800 text-gray-200 rounded-bl-none border border-neutral-700'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {state.isLoading && (
              <div className="flex justify-start">
                 <div className="bg-neutral-800 p-3 rounded-lg rounded-bl-none border border-neutral-700">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-neutral-900 border-t border-neutral-800 flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about design..."
              className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-gray-600 px-2"
            />
            <button 
              type="submit" 
              disabled={state.isLoading}
              className="text-xs uppercase font-bold text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={toggleChat}
        className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
      >
        {state.isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:rotate-12 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatWidget;