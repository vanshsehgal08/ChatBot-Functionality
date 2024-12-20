import React from 'react';
import { Route } from 'react-router-dom';
import Home from '../pages/Home';
import AiAssistant from '../pages/AiAssistant';
import Videos from '../pages/Videos';
import Calculator from '../pages/Calculator';
import Quiz from '../pages/Quiz';
import News from '../pages/News';

export const routes = [
  { path: 'https://green-quest-zeta.vercel.app/', element: <Home /> },
  { path: '/ai-assistant', element: <AiAssistant /> },
  { path: '/videos', element: <Videos /> },
  { path: '/calculator', element: <Calculator /> },
  { path: 'https://quiz-functionality.vercel.app/', element: <Quiz /> },
  { path: '/news', element: <News /> },
];

export function AppRoutes() {
  return (
    <>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </>
  );
}