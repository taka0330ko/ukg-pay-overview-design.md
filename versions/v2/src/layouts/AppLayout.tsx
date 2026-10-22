import type { ReactNode } from 'react';
import { SideMenu, SideMenuToggleButton } from '../components/side-menu';
export function AppLayout({children}:{children?:ReactNode}) { return <div className="workspace-bg flex min-h-screen"><SideMenu/><main className="app-main min-w-0 flex-1"><div className="menu-bar"><SideMenuToggleButton/></div>{children}</main></div>; }
