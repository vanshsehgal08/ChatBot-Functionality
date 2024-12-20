export const loadChatHistory = () => {
  return JSON.parse(localStorage.getItem('saved-api-chats') || '[]');
};

export const saveChatHistory = (chats: any[]) => {
  localStorage.setItem('saved-api-chats', JSON.stringify(chats));
};

export const clearChatHistory = () => {
  localStorage.removeItem('saved-api-chats');
};