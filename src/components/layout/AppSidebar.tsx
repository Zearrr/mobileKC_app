import { 
  LayoutDashboard, 
  Wrench, 
  Package, 
  Users, 
  ShoppingCart, 
  FileText, 
  Shield, 
  Wallet,
  Settings,
  LogOut
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Wrench className="h-6 w-6 text-primary-foreground" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">FixFlow</h1>
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
