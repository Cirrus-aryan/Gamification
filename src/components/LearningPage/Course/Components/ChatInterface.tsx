'use client';

import { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: number;
  sender: 'user' | 'ai' | 'system';
  message: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isExamActive: boolean;
}

export default function ChatInterface({ messages, onSendMessage, isExamActive }: ChatInterfaceProps) {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getSenderIcon = (sender: string) => {
    switch (sender) {
      case 'ai': return 'ri-robot-line';
      case 'system': return 'ri-notification-line';
      default: return 'ri-user-line';
    }
  };

  const getSenderColor = (sender: string) => {
    switch (sender) {
      case 'ai': return 'bg-blue-500';
      case 'system': return 'bg-green-500';
      case 'user': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getMessageStyle = (sender: string) => {
    switch (sender) {
      case 'user': return 'bg-purple-600 text-white ml-auto';
      case 'ai': return 'bg-blue-100 text-gray-900';
      case 'system': return 'bg-green-100 text-gray-900 border border-green-200';
      default: return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[700px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
            <i className="ri-chat-3-line text-white"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">AI Exam Chat</h3>
            <p className="text-sm text-gray-500">
              {isExamActive ? 'Exam in progress...' : 'Exam completed'}
            </p>
          </div>
          <div className="ml-auto">
            <div className={`w-3 h-3 rounded-full ${isExamActive ? 'bg-green-400' : 'bg-gray-400'}`}></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] flex ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getSenderColor(message.sender)} ${message.sender === 'user' ? 'ml-2' : 'mr-2'}`}>
                <i className={`${getSenderIcon(message.sender)} text-white text-sm`}></i>
              </div>
              <div className={`p-3 rounded-lg ${getMessageStyle(message.sender)}`}>
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.message}
                </div>
                <p className={`text-xs mt-2 ${
                  message.sender === 'user' ? 'text-purple-200' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={isExamActive ? "Encourage the AI or ask questions..." : "Chat with the AI about the exam..."}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            maxLength={200}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            <i className="ri-send-plane-line"></i>
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          {isExamActive ? "Type 'start' to begin the exam" : "Chat with the AI about its exam performance"}
        </p>
      </div>
    </div>
  );
}