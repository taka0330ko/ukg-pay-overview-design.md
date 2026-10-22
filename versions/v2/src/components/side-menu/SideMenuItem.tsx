import type { LucideIcon } from "lucide-react";


type SideMenuItemProps = {
  icon?: LucideIcon;
  isActive?: boolean;
  isExpanded?: boolean;
  label: string;
  showChevron?: boolean;
  variant?: "parent" | "child";
};

export function SideMenuItem({
  icon: Icon,
  isActive = false,
  isExpanded = false,
  label,
  showChevron = false,
  variant = "parent",
}: SideMenuItemProps) {

  const isChild = variant === "child";

  const asset:Record<string,string>={Time:"time",Pay:"pay","My profile":"user","Career & development":"career",Benefits:"gift",Company:"company",Home:"home","Sign out":"sign-out"};
  return (
    <button
      className={`sidebar-item flex w-full cursor-not-allowed items-center rounded-[12px] text-left leading-tight ${
        isChild
          ? "min-h-12 px-[40px] text-[14px]"
          : "min-h-12 gap-4 px-3 text-[16px] font-medium"
      } ${
        isActive
          ? "sidebar-item-active font-bold"
          : "sidebar-item-idle"
      }`}
      type="button"
    >
      {Icon ? (
        <img className="sidebar-icon" src={`/assets/${asset[label]}.svg`} alt="" width="24" height="24"/>
      ) : null}
      <span className="min-w-0 flex-1">{label}</span>
      {showChevron ? (
        <img src="/assets/caret.svg" alt="" width="24" height="24" style={{transform:isExpanded?"rotate(180deg)":undefined}}/>
      ) : null}
    </button>
  );
}
