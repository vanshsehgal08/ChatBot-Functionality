import { marked } from 'marked';
import hljs from 'highlight.js';

export const renderMarkdown = (content: string): string => {
  return marked(content, {
    highlight: (code, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      }
      return code;
    }
  });
};