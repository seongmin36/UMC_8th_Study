interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-blue-100 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}
      <aside className={`fixed top-0`}></aside>
    </>
  );
};

export default SideBar;
