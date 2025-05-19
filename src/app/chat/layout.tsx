import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel de Chat",
  description: "Administra tus conversaciones con los clientes",
};

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6 h-[calc(100vh-80px)]">
      {children}
    </div>
  );
}
