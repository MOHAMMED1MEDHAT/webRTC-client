import { Send, X } from 'lucide-react';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useMeetStore } from '../store/meetStore';

interface ChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Chat = ({ isOpen, onClose }: ChatProps) => {
  const [message, setMessage] = React.useState('');
  const { messages, addMessage } = useMeetStore();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage({
        id: uuidv4(),
        sender: 'You',
        content: message.trim(),
        timestamp: new Date(),
      });
      setMessage('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 bottom-16 w-80 bg-white border-l shadow-lg flex flex-col">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="font-semibold">Meeting Chat</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-medium text-sm">{msg.sender}</span>
              <span className="text-xs text-gray-500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="mt-1 text-sm">{msg.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};