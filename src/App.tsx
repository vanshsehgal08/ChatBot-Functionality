import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import HomeButton from './components/ui/HomeButton';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { isClimateRelated } from './utils/climate';
import { loadChatHistory, saveChatHistory, clearChatHistory } from './utils/storage';
import { sendMessage } from './services/api';

interface Message {
  content: string;
  isUser: boolean;
  isError?: boolean;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestedQuestions = [
    "What is climate change?",
    "How can we reduce carbon footprints?",
    "What are renewable energy sources?",
    "How does deforestation affect global warming?",
  ];

  useEffect(() => {
    const savedMessages = loadChatHistory();
    const formattedMessages = savedMessages.flatMap((chat: any) => [
      { content: chat.userMessage, isUser: true },
      {
        content: chat.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text || 'Error processing response',
        isUser: false,
        isError: !chat.apiResponse?.candidates?.[0]?.content?.parts?.[0]?.text,
      },
    ]);
    setMessages(formattedMessages);
  }, []);

  const handleSendMessage = async (message: string) => {
    // Clear previous messages before adding a new message
    setMessages([]);  // This clears the existing chat history

    setShowSuggestions(false);
    if (!isClimateRelated(message)) {
      setMessages((prev) => [
        ...prev,
        { content: message, isUser: true },
        { content: 'Please ask specific questions related to climate or the environment.', isUser: false, isError: true },
      ]);
      return;
    }

    setIsLoading(true);
    setMessages((prev) => [...prev, { content: message, isUser: true }]);

    try {
      const { responseText, data } = await sendMessage(message);
      setMessages((prev) => [...prev, { content: responseText, isUser: false }]);

      const savedChats = loadChatHistory();
      savedChats.push({ userMessage: message, apiResponse: data });
      saveChatHistory(savedChats);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: error instanceof Error ? error.message : 'An error occurred',
          isUser: false,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to delete all chat history?')) {
      setMessages([]);
      clearChatHistory();
      setShowSuggestions(true);
    }
  };

  return (
    <Router>
      <PageLayout>
        <HomeButton />
        <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
          {showSuggestions && (
            <div className="max-w-4xl mx-auto mt-8 space-y-4">
              <h2 className="text-xl font-bold mb-4">Suggested Questions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {suggestedQuestions.map((question, index) => (
                  <div
                    key={index}
                    className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-md cursor-pointer transform transition-all duration-200 hover:scale-105"
                    onClick={() => handleSendMessage(question)}
                  >
                    <h3 className="text-lg font-medium text-gray-700">{question}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          <main className="flex-grow max-w-4xl mx-auto pt-10 pb-24">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                isUser={message.isUser}
                isError={message.isError}
              />
            ))}
          </main>

          <div className="w-full bg-white shadow-md px-4 py-4">
            <ChatInput
              onSend={handleSendMessage}
              onClear={handleClear}
              isLoading={isLoading}
            />
          </div>
        </div>
      </PageLayout>
    </Router>
  );
}

export default App;
