import { Dispatch, SetStateAction } from 'react';

export interface NavItem {
  id: string;
  label: string;
}

interface HeaderProps {
  nav: NavItem[];
  current: string;
  onSelect: Dispatch<SetStateAction<string>> | ((id: string) => void);
  onMenu: () => void;
}

function Header({ nav, current, onSelect, onMenu }: HeaderProps) {
  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Formula D Utils</h1>
      <nav className="hidden md:flex gap-4">
        {nav.map((item) => (
          <button
            key={item.id}
            className={`pb-1 border-b-2 ${
              current === item.id ? 'border-white' : 'border-transparent'
            }`}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button className="md:hidden" onClick={onMenu} aria-label="Menu">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  );
}

export default Header;
