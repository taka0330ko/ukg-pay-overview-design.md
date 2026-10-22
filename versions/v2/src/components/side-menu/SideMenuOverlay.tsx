type SideMenuOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SideMenuOverlay({ isOpen, onClose }: SideMenuOverlayProps) {
  return (
    <button
      aria-label="Close side menu overlay"
      className={`fixed inset-0 z-80 bg-black/30 transition-opacity duration-300 md:hidden ${
        isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      type="button"
      onClick={onClose}
    />
  );
}
