import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_NAVIGATION } from '../../constants/navigation';

interface NavLinksProps {
  currentPath: string;
}

export default function NavLinks({ currentPath }: NavLinksProps) {
  const isActive = (path: string) => {
    return currentPath === path ? 'text-green-200' : 'text-white hover:text-green-200';
  };

  return (
    <div className="hidden md:flex space-x-8">
      {MAIN_NAVIGATION.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className={`transition-colors ${isActive(path)}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}