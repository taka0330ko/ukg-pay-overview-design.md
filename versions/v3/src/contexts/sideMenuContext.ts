import { createContext } from "react";

export type SideMenuContextValue = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

export const SideMenuContext = createContext<SideMenuContextValue | null>(null);
