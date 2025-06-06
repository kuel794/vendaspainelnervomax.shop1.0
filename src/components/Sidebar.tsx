import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart2, 
  DollarSign, 
  Calendar, 
  Settings, 
  TrendingUp, 
  Users, 
  Activity,
  ChevronLeft,
  ChevronRight,
  Brain
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside
      className={`bg-primary-900 text-white transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } hidden md:block`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} p-4`}>
          {!collapsed && (
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-white" />
              <span className="text-xl font-bold">NERVOMAX</span>
            </div>
          )}
          {collapsed && (
            <Brain className="w-8 h-8 text-white" />
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-primary-800 focus:outline-none"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-2">
            <SidebarItem
              icon={<LayoutDashboard />}
              text="Dashboard"
              to="/"
              collapsed={collapsed}
              active={true}
            />
            <SidebarItem
              icon={<BarChart2 />}
              text="Relatórios"
              to="/reports"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<DollarSign />}
              text="Vendas"
              to="/sales"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<TrendingUp />}
              text="Desempenho"
              to="/performance"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Users />}
              text="Clientes"
              to="/customers"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Activity />}
              text="Marketing"
              to="/marketing"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Calendar />}
              text="Agenda"
              to="/calendar"
              collapsed={collapsed}
            />
            <SidebarItem
              icon={<Settings />}
              text="Configurações"
              to="/settings"
              collapsed={collapsed}
            />
          </ul>
        </nav>
        
        <div className="p-4 border-t border-primary-800">
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="flex-shrink-0 w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">N</span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">NERVOMAX</p>
                <p className="text-xs text-primary-300 truncate">Versão 1.0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  to: string;
  collapsed: boolean;
  active?: boolean;
}

const SidebarItem = ({ icon, text, to, collapsed, active = false }: SidebarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center p-2 rounded-lg ${
          active
            ? 'bg-primary-800 text-white'
            : 'text-primary-100 hover:bg-primary-800 hover:text-white'
        } ${collapsed ? 'justify-center' : 'space-x-3'}`}
      >
        <span className="flex-shrink-0 w-6 h-6">{icon}</span>
        {!collapsed && <span className="flex-1 whitespace-nowrap">{text}</span>}
      </Link>
    </li>
  );
};

export default Sidebar;