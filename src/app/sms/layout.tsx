import { ReactNode } from "react";

interface SmsLayoutProps {
  children: ReactNode;
}

export default function SmsLayout({ children }: SmsLayoutProps) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
