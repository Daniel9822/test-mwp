import { ReactNode } from "react";

interface CouponsLayoutProps {
  children: ReactNode;
}

export default function CouponsLayout({ children }: CouponsLayoutProps) {
  return (
    <div className="w-full h-full">
      {children}
    </div>
  );
}
