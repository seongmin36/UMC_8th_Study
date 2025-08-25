// context/SidebarContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleEnabled, setIsToggleEnabled] = useState(false);

  const closeSidebar = () => setIsOpen(false);
  const toggleSidebar = () => setIsToggleEnabled((prev) => !prev);

  // 창 크기에 따라 사이드바 Open 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 700;

      if (!isToggleEnabled) {
        // 토글이 활성화 되지 않은경우
        setIsOpen(false); // 열지않음
        // console.log(isOpen);
      } else {
        // 토글이 활성화 된 경우
        setIsOpen(!isMobile); // 여는데 innerWidth에 맞춰서
        // console.log(isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [isToggleEnabled]);

  // 사용자가 토글 버튼 누를 때
  useEffect(() => {
    // const isMobile = window.innerWidth < 768;
    if (isToggleEnabled) {
      setIsOpen(true);
      // console.log(isOpen);
    } else {
      setIsOpen(false);
      // console.log(isOpen);
    }
  }, [isToggleEnabled]);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("SidebarProvider로 감싸야 합니다.");
  return context;
};
