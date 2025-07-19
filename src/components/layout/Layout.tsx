import { ReactNode, useState } from 'react';
import Header, { NavItem } from './Header';
import Sidebar from './Sidebar';

export type ToolId = 'movement' | 'dice' | 'damage' | 'curve' | 'log' | 'qualify';

interface LayoutProps {
  children: ReactNode;
  current: ToolId;
  setCurrent: (id: ToolId) => void;
}

const navItems: NavItem[] = [
  { id: 'movement', label: 'Movimiento' },
  { id: 'dice', label: 'Tiradas' },
  { id: 'damage', label: 'Daños' },
  { id: 'curve', label: 'Curvas' },
  { id: 'log', label: 'Registro' },
  { id: 'qualify', label: 'Clasificación' },
];

function Layout({ children, current, setCurrent }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      <Header
        nav={navItems}
        current={current}
        onSelect={(id) => setCurrent(id as ToolId)}
        onMenu={() => setMobileOpen(true)}
      />
      <div className="flex flex-1">
        <Sidebar
          nav={navItems}
          current={current}
          onSelect={(id) => setCurrent(id as ToolId)}
          className="hidden md:block"
        />
        <main className="flex-1 p-4 max-w-screen-md w-full mx-auto">{children}</main>
      </div>
      <Sidebar
        nav={navItems}
        current={current}
        onSelect={(id) => {
          setCurrent(id as ToolId);
          setMobileOpen(false);
        }}
        mobile
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        className="md:hidden"
      />
    </div>
  );
}

export default Layout;
