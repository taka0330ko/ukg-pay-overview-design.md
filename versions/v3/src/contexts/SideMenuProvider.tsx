import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { SideMenuContext } from "./sideMenuContext";

type SideMenuProviderProps = {
  children: ReactNode;
};

export function SideMenuProvider({ children }: SideMenuProviderProps) {
  const [isOpen, setIsOpen] = useState<boolean>(() => window.innerWidth >= 768);

  const openMenu = useCallback((): void => {
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback((): void => {
    setIsOpen(false);
  }, []);

  const toggleMenu = useCallback((): void => {
    setIsOpen((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isOpen,
      openMenu,
      closeMenu,
      toggleMenu,
    }),
    [closeMenu, isOpen, openMenu, toggleMenu],
  );

  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
}
