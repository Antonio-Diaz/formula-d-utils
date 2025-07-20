import { ReactNode, useState } from 'react';
import Header, { NavItem } from './Header';
import Sidebar from './Sidebar';

export type ToolId = 'movement' | 'dice' | 'damage' | 'curve' | 'log' | 'qualify';

interface LayoutProps {
  children: ReactNode;
  current: ToolId;
  setCurrent: (id: ToolId) => void;
  aside?: ReactNode;
}

const navItems: NavItem[] = [
  { id: 'movement', label: 'Movimiento' },
  { id: 'dice', label: 'Tiradas' },
  { id: 'damage', label: 'Daños' },
  { id: 'curve', label: 'Curvas' },
  { id: 'log', label: 'Registro' },
  { id: 'qualify', label: 'Clasificación' },
];

function Layout({ children, current, setCurrent, aside }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-carbon text-electricBlue">
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
        <main className="flex-1 p-6 max-w-screen-md w-full mx-auto grid gap-6">{children}</main>
        {aside && <aside className="hidden lg:block w-72 p-4">{aside}</aside>}
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
