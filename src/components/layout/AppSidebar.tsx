import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  Shield,
  ShoppingCart,
  Users,
  Wallet,
  Wrench
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

interface MenuItem {
  title: string;
  url: string;
  icon: any;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  { title: 'แดชบอร์ด', url: '/dashboard', icon: LayoutDashboard, roles: ['admin', 'staff', 'finance', 'viewer'] },
  { title: 'งานซ่อม', url: '/jobs', icon: Wrench, roles: ['admin', 'staff', 'viewer'] },
  { title: 'คลังสินค้า', url: '/inventory', icon: Package, roles: ['admin', 'staff', 'finance', 'viewer'] },
  { title: 'ลูกค้า', url: '/customers', icon: Users, roles: ['admin', 'staff', 'viewer'] },
  { title: 'ขายหน้าร้าน', url: '/sales', icon: ShoppingCart, roles: ['admin', 'staff'] },
  { title: 'เคลม/ประกัน', url: '/claims', icon: Shield, roles: ['admin', 'staff', 'viewer'] },
  { title: 'การเงิน', url: '/finance', icon: Wallet, roles: ['admin', 'finance'] },
  { title: 'รายงาน', url: '/reports', icon: FileText, roles: ['admin', 'finance'] },
  { title: 'ตั้งค่า', url: '/settings', icon: Settings, roles: ['admin'] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, logout } = useAuth();

  const isCollapsed = state === 'collapsed';

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? 'bg-sidebar-accent text-sidebar-primary font-medium' 
      : 'hover:bg-sidebar-accent/50';

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center">
            <img src="/KODPHONELOGO.png" alt="FixFlow Logo" className="h-14 w-14 rounded-full object-cover" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">KODPHONE</h1>
              <p className="text-xs text-sidebar-foreground/60">ระบบจัดการร้านซ่อม</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <Separator className="bg-sidebar-border" />

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-sidebar-foreground/60">
              เมนูหลัก
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavClass}>
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="space-y-2">
          {!isCollapsed && user && (
            <div className="rounded-lg bg-sidebar-accent p-3">
              <p className="text-sm font-medium text-sidebar-foreground">{user.name}</p>
              <p className="text-xs text-sidebar-foreground/60">{user.email}</p>
            </div>
          )}
          <Button
            variant="ghost"
            size={isCollapsed ? 'icon' : 'default'}
            className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">ออกจากระบบ</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
