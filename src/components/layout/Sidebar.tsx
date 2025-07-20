import { Dispatch, SetStateAction } from 'react';
import type { NavItem } from './Header';

interface SidebarProps {
  nav: NavItem[];
  current: string;
  onSelect: Dispatch<SetStateAction<string>> | ((id: string) => void);
  open?: boolean;
  onClose?: () => void;
  mobile?: boolean;
  className?: string;
}

function Sidebar({ nav, current, onSelect, open = false, onClose, mobile = false, className = '' }: SidebarProps) {
  const base = mobile
    ? `fixed inset-y-0 left-0 w-64 bg-graphite/90 backdrop-blur-lg transform transition-transform z-20 ${open ? 'translate-x-0' : '-translate-x-full'}`
    : `w-48 bg-graphite/70 backdrop-blur-lg text-electricBlue p-4 border-r border-electricBlue ${className}`;

  const content = (
    <div className="h-full flex flex-col gap-2 p-4">
      {nav.map((item) => (
        <button
          key={item.id}
          className={`text-left rounded px-2 py-1 transition-colors ${current === item.id ? 'bg-electricBlue text-graphite font-semibold' : 'hover:text-neonPink'}`}
          onClick={() => onSelect(item.id)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );

  if (mobile) {
    return (
      <div className={base}>
        <button className="absolute top-2 right-2" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>
        {content}
      </div>
    );
  }

  return <aside className={base}>{content}</aside>;
}

export default Sidebar;
