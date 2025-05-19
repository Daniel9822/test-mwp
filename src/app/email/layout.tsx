import { ReactNode } from "react";

interface EmailLayoutProps {
  children: ReactNode;
}

export default function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
