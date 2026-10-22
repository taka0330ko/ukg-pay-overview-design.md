import { useContext } from "react";
import { SideMenuContext } from "../contexts/sideMenuContext";
import type { SideMenuContextValue } from "../contexts/sideMenuContext";

export function useSideMenu(): SideMenuContextValue {
  const context = useContext(SideMenuContext);

  if (!context) {
    throw new Error("useSideMenu must be used within SideMenuProvider");
  }

  return context;
}
