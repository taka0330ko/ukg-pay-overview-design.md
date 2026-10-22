import { Menu } from "lucide-react";
import { useSideMenu } from "../../hooks/useSideMenu";

export function SideMenuToggleButton() {
  const { isOpen, toggleMenu } = useSideMenu();

  return (
    <button
      aria-label="Toggle side menu"
      className={`rounded-full p-2 hover:bg-gray-200 cursor-pointer mt-4 ${
        isOpen ? "hidden" : ""
      }`}
      type="button"
      onClick={toggleMenu}
    >
      <Menu />
    </button>
  );
}
