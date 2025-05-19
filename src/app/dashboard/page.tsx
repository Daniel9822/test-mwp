import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Package2,
  RotateCcw,
  DollarSign,
  Users2,
  TrendingUp,
  TrendingDown,
  ArrowUp,
  MoreVertical,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RecentOrders from "@/components/admin/dashboard/RecentOrders";
import TrafficSources from "@/components/admin/dashboard/TrafficSources";
import TaxCard from "@/components/admin/dashboard/TaxCard";
import HelpLineCard from "@/components/admin/dashboard/HelpLineCard";
import DashboardChart from "@/components/admin/dashboard/DashboardChart";
import PaymentsOverview from "@/components/admin/dashboard/PaymentsOverview";

export default function DashboardPage() {
  // Redirigir si es necesario, pero para mostrar el dashboard, comentar o eliminar la redirección.
  // redirect("/");

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        {/* Total Orders */}
        <Card>
          <div className="stat-card">
            <div className="stat-card-icon bg-primary">
              <Package2 size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                TOTAL ORDERS
              </div>
              <div className="text-2xl font-bold">687.3k</div>
              <div className="percent-down flex items-center gap-1 text-destructive">
                <TrendingDown size={14} />
                <span>9.19% Since last month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Total Returns */}
        <Card>
          <div className="stat-card">
            <div className="stat-card-icon bg-secondary">
              <RotateCcw size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                TOTAL RETURNS
              </div>
              <div className="text-2xl font-bold">9.62k</div>
              <div className="percent-up flex items-center gap-1 text-success">
                <TrendingUp size={14} />
                <span>26.87% Since last month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Average Sales */}
        <Card>
          <div className="stat-card">
            <div className="stat-card-icon bg-accent">
              <DollarSign size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                AVG. SALES EARNINGS
              </div>
              <div className="text-2xl font-bold">$98.24</div>
              <div className="text-xs text-muted-foreground mb-1">USD</div>
              <div className="percent-up flex items-center gap-1 text-success">
                <TrendingUp size={14} />
                <span>3.51% Since last month</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Total Visits */}
        <Card>
          <div className="stat-card">
            <div
              className="stat-card-icon"
              style={{ backgroundColor: "hsl(var(--chart-4))" }}
            >
              <Users2 size={24} />
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground mb-1">
                NUMBER OF VISITS
              </div>
              <div className="text-2xl font-bold">87.94M</div>
              <div className="percent-down flex items-center gap-1 text-destructive">
                <TrendingDown size={14} />
                <span>1.05% Since last month</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      {/* ...otros componentes del dashboard... */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Overview Section */}
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-6">
                <h2 className="text-lg font-medium">Overview</h2>
                <Button variant="outline" className="text-primary border-primary/20 bg-primary/5 hover:bg-primary/10">
                  Export
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
                <PaymentsOverview />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Help Line Card */}
          <HelpLineCard />

          {/* Tax Information Card */}
          {/* <TaxCard /> */}

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
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Recent Orders:</h2>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-primary/10 text-primary"
            >
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
