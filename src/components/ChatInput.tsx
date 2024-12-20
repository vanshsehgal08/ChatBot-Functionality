import { Send, Trash2 } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function ChatInput({ onSend, onClear, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="bg-gradient-to-b from-transparent to-emerald-50 py-6 mb-12"> {/* Added margin-bottom here */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about environmental topics..."
            className="flex-1 px-4 py-3 rounded-lg border border-emerald-200 bg-white text-emerald-900 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !message.trim()}
            className="p-3 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Send className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onClear}
            className="p-3 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors duration-200"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
