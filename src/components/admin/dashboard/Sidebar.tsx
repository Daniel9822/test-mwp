"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CreditCard,
  Calendar,
  Mail,
  MessageSquare,
  ShoppingCart,
  FileText,
  ChevronRight,
  PlusCircle,
  PackageOpen,
  ListOrdered,
  Users,
  MessageCircle,
  Tag,
  Ticket
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [ecommerceOpen, setEcommerceOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  // Verificar si la ruta actual está dentro de la sección de ecommerce o invoice
  // y abrir el menú correspondiente automáticamente
  useEffect(() => {
    if (pathname?.includes('/ecommerce')) {
      setEcommerceOpen(true);
    }
    if (pathname?.includes('/invoice')) {
      setInvoiceOpen(true);
    }
  }, [pathname]);

  return (
    <aside className="w-60 h-full overflow-y-auto border-r border-white/10 flex flex-col bg-gradient-to-br from-[hsl(var(--sidebar-bg))] to-[hsl(var(--sidebar-bg)_/_0.9)] relative">
      {/* Efectos decorativos */}
      <div className="absolute top-0 right-0 w-full h-64 bg-[hsl(var(--sidebar-accent))] opacity-10 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-3/4 h-64 bg-[hsl(var(--primary))] opacity-10 blur-[100px] pointer-events-none"></div>

      {/* Logo */}
      <div className="p-4 flex items-center relative">
        <Link href="/" className="flex items-center gap-1.5 z-10">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full -z-10"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-white/20 backdrop-blur-md rounded-full"></div>
          </div>
          <span className="text-lg font-bold text-white">MWP</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        {/* Dashboard Section */}
        <div className="mb-4">
          <div className="sidebar-category">DASH</div>
          <ul className="mt-2 space-y-1 px-2">
            <li>
              <Link
                href="/dashboard"
                className={`sidebar-item ${pathname === '/dashboard' ? 'active' : ''}`}
              >
                <LayoutDashboard size={18} />
                <span>Overview</span>
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/payments"
                className={`sidebar-item ${pathname === '/dashboard/payments' ? 'active' : ''}`}
              >
                <CreditCard size={18} />
                <span>Payments</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Online Services Section */}
        <div className="mb-4">
          <div className="sidebar-category">ONLINE SERVICES</div>
          <ul className="mt-2 space-y-1 px-2">
            <li>
              <Link
                href="/appointments"
                className={`sidebar-item ${pathname === '/appointments' ? 'active' : ''}`}
              >
                <Calendar size={18} />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/email"
                className={`sidebar-item ${pathname === '/email' ? 'active' : ''}`}
              >
                <Mail size={18} />
                <span>Email</span>
              </Link>
            </li>
            <li>
              <Link
                href="/sms"
                className={`sidebar-item ${pathname === '/sms' ? 'active' : ''}`}
              >
                <MessageCircle size={18} />
                <span>SMS</span>
              </Link>
            </li>
            <li>
              <Link
                href="/chat"
                className={`sidebar-item ${pathname === '/chat' ? 'active' : ''}`}
              >
                <MessageSquare size={18} />
                <span>Chat</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => setEcommerceOpen(!ecommerceOpen)}
                type="button"
                className="sidebar-item w-full flex justify-between"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} />
                  <span>Ecommerce</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${ecommerceOpen ? 'rotate-90' : ''}`}
                />
              </button>
              {ecommerceOpen && (
                <ul className="pl-8 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/ecommerce/products"
                      className={`sidebar-item ${pathname === '/ecommerce/products' ? 'active' : ''}`}
                    >
                      <span>Products</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ecommerce/products/add"
                      className={`sidebar-item ${pathname === '/ecommerce/products/add' ? 'active' : ''}`}
                    >
                      <span>Add Product</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ecommerce/categories"
                      className={`sidebar-item ${pathname === '/ecommerce/categories' ? 'active' : ''}`}
                    >
                      <span>Categories</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ecommerce/orders"
                      className={`sidebar-item ${pathname === '/ecommerce/orders' ? 'active' : ''}`}
                    >
                      <span>Orders</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/ecommerce/customers"
                      className={`sidebar-item ${pathname === '/ecommerce/customers' ? 'active' : ''}`}
                    >
                      <span>Customers</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* Internal Services Section */}
        <div className="mb-4">
          <div className="sidebar-category">INTERNAL SERVICES</div>
          <ul className="mt-2 space-y-1 px-2">
            <li>
              <button
                onClick={() => setInvoiceOpen(!invoiceOpen)}
                type="button"
                className="sidebar-item w-full flex justify-between"
              >
                <div className="flex items-center gap-3">
                  <FileText size={18} />
                  <span>Invoice</span>
                </div>
                <ChevronRight
                  size={16}
                  className={`transition-transform ${invoiceOpen ? 'rotate-90' : ''}`}
                />
              </button>
              {invoiceOpen && (
                <ul className="pl-8 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/invoice/create"
                      className={`sidebar-item ${pathname === '/invoice/create' ? 'active' : ''}`}
                    >
                      <span>Create Invoice</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/invoice/list"
                      className={`sidebar-item ${pathname === '/invoice/list' ? 'active' : ''}`}
                    >
                      <span>List</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/invoice/details"
                      className={`sidebar-item ${pathname === '/invoice/details' ? 'active' : ''}`}
                    >
                      <span>Details</span>
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                href="/coupons"
                className={`sidebar-item ${pathname === '/coupons' ? 'active' : ''}`}
              >
                <Ticket size={18} />
                <span>Coupons</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
