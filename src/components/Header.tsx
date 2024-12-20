import { Recycle, Leaf, Droplet, Globe } from 'lucide-react';

interface SuggestionProps {
  text: string;
  icon: React.ReactNode;
  onClick: (text: string) => void;
}

const Suggestion = ({ text, icon, onClick }: SuggestionProps) => (
  <div 
    onClick={() => onClick(text)}
    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
  >
    <p className="text-gray-800 dark:text-gray-200 mb-3">{text}</p>
    <div className="text-green-500">{icon}</div>
  </div>
);

interface HeaderProps {
  onSuggestionClick: (text: string) => void;
  show: boolean;
}

export default function Header({ onSuggestionClick, show }: HeaderProps) {
  const suggestions = [
    {
      text: "Give tips on reducing household waste",
      icon: <Recycle className="w-6 h-6" />
    },
    {
      text: "Help me write a message promoting eco-friendly habits",
      icon: <Leaf className="w-6 h-6" />
    },
    {
      text: "Share simple ways to conserve water at home",
      icon: <Droplet className="w-6 h-6" />
    },
    {
      text: "Suggest activities to promote awareness about climate change",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  if (!show) return null;

  return (
    <header className="pt-20 px-4 mb-8">
      <div className="max-w-2xl mx-auto text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">GreenQuest ChatBot</h1>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {suggestions.map((suggestion, index) => (
          <Suggestion
            key={index}
            text={suggestion.text}
            icon={suggestion.icon}
            onClick={onSuggestionClick}
          />
        ))}
      </div>
    </header>
  );
}