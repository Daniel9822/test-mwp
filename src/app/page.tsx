import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Package,
  BarChart,
  DollarSign,
  Users,
  FileText,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  MoreVertical,
  LineChart,
  CircleDollarSign,
  BarChart2,
  PiggyBank,
  ExternalLink
} from "lucide-react";

import StatsCards from "@/components/dashboard/StatsCards";
import DashboardChart from "@/components/dashboard/DashboardChart";
import TrafficSources from "@/components/dashboard/TrafficSources";
import RecentOrders from "@/components/dashboard/RecentOrders";
import TaxCard from "@/components/dashboard/TaxCard";
import HelpLineCard from "@/components/dashboard/HelpLineCard";

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium">Dashboard</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Sort By
        </Button>
      </div>

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Overview Section */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Overview</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Financial Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pb-6">
                <div className="space-y-1">
                  <div className="text-muted-foreground text-sm">Revenue</div>
                  <div className="flex items-center gap-2">
                    <span className="text-positive">
                      <ArrowUpRight size={16} />
                    </span>
                    <span className="text-xl font-medium">$29.5k</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground text-sm">Expenses</div>
                  <div className="flex items-center gap-2">
                    <span className="text-negative">
                      <ArrowUpRight size={16} />
                    </span>
                    <span className="text-xl font-medium">$15.07k</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground text-sm">Investment</div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      <ArrowUpRight size={16} />
                    </span>
                    <span className="text-xl font-medium">$3.6k</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-muted-foreground text-sm">Savings</div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      <ArrowUpRight size={16} />
                    </span>
                    <span className="text-xl font-medium">$6.9k</span>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="px-6 pb-6 h-80">
                <DashboardChart />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Help Line Card */}
          <HelpLineCard />

          {/* Tax Information Card */}
          <TaxCard />

          {/* Traffic Sources Card */}
          <Card>
            <CardContent className="p-0">
              <div className="p-6 flex items-center justify-between">
                <h2 className="text-lg font-medium">Top Traffic by Source</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="px-6 pb-6">
                <TrafficSources />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Orders:</h2>
            <Button variant="ghost" size="icon" className="rounded-full bg-primary/10 text-primary">
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          <RecentOrders />
          <div className="mt-4 text-center">
            <Button variant="ghost" className="text-primary">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
