import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Dashboard",
  description: "Manage your ecommerce store",
};

export default function EcommerceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
