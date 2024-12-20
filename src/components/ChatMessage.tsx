import { Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { renderMarkdown } from '../utils/markdown';

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isError?: boolean;
}

export default function ChatMessage({ content, isUser, isError = false }: ChatMessageProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderContent = () => {
    if (isUser) return content;
    return <div dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />;
  };

  return (
    <div 
      className={`
        flex items-start gap-6 p-6 rounded-2xl mb-4 transition-all duration-300
        ${isUser 
          ? 'bg-gradient-to-r from-emerald-100 to-green-100 shadow-sm' 
          : 'bg-white shadow-lg border border-emerald-100'
        }
        ${isError ? 'border-l-4 border-red-500' : ''}
      `}
    >
      <div className="relative">
        <img 
          src={isUser 
            ? "https://ui-avatars.com/api/?name=User&background=059669&color=ffffff" 
            : "https://api.dicebear.com/7.x/bottts/svg?seed=eco&backgroundColor=059669"
          } 
          alt={isUser ? "User avatar" : "EcoBot avatar"}
          className={`
            w-10 h-10 rounded-full ring-2 
            ${isUser 
              ? 'ring-emerald-600' 
              : 'ring-emerald-600'
            }
          `}
        />
        {!isUser && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-600 rounded-full border-2 border-white" />
        )}
      </div>

      <div className="flex-1">
        <div className="mb-1 text-sm font-medium text-emerald-800">
          {isUser ? 'You' : 'EcoBot'}
        </div>
        <div className={`
          prose max-w-none
          ${isError ? 'text-red-600' : 'text-emerald-900'}
        `}>
          {renderContent()}
        </div>
      </div>

      {!isUser && !isError && (
        <button
          onClick={copyToClipboard}
          className={`
            p-2 rounded-lg transition-all duration-200
            ${isCopied 
              ? 'bg-emerald-100 text-emerald-700' 
              : 'text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50'
            }
          `}
          aria-label={isCopied ? "Copied!" : "Copy message"}
        >
          {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
}