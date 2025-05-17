"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, DollarSign, Users, ArrowUp, ArrowDown } from "lucide-react";

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Orders Card */}
      <Card>
        <CardContent className="p-0">
          <div className="stat-card">
            <div className="stat-card-icon bg-blue-500">
              <Package size={20} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">TOTAL ORDERS</h2>
              <p className="text-2xl font-semibold mt-1">687.3k</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="percent-down">
                  <ArrowDown size={14} />
                  <span>9.19%</span>
                </div>
                <span className="text-xs text-muted-foreground">Since last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Returns Card */}
      <Card>
        <CardContent className="p-0">
          <div className="stat-card">
            <div className="stat-card-icon bg-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 9V6a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v3" />
                <rect width="16" height="8" x="4" y="13" rx="2" />
                <path d="M12 19v-8" />
                <path d="m9 15 3-3 3 3" />
              </svg>
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">TOTAL RETURNS</h2>
              <p className="text-2xl font-semibold mt-1">9.62k</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="percent-up">
                  <ArrowUp size={14} />
                  <span>26.87%</span>
                </div>
                <span className="text-xs text-muted-foreground">Since last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Average Sales Earnings Card */}
      <Card>
        <CardContent className="p-0">
          <div className="stat-card">
            <div className="stat-card-icon bg-emerald-500">
              <DollarSign size={20} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">AVG. SALES EARNINGS</h2>
              <div className="mt-1">
                <p className="text-2xl font-semibold">$98.24</p>
                <p className="text-sm font-medium text-muted-foreground">USD</p>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <div className="percent-up">
                  <ArrowUp size={14} />
                  <span>3.51%</span>
                </div>
                <span className="text-xs text-muted-foreground">Since last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Number of Visits Card */}
      <Card>
        <CardContent className="p-0">
          <div className="stat-card">
            <div className="stat-card-icon bg-purple-500">
              <Users size={20} />
            </div>
            <div>
              <h2 className="text-sm font-medium text-muted-foreground">NUMBER OF VISITS</h2>
              <p className="text-2xl font-semibold mt-1">87.94M</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="percent-down">
                  <ArrowDown size={14} />
                  <span>1.05%</span>
                </div>
                <span className="text-xs text-muted-foreground">Since last month</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
