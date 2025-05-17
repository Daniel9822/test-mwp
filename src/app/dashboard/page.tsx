import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Package2, RotateCcw, DollarSign, Users2, TrendingUp, TrendingDown } from "lucide-react";

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
            <div className="stat-card-icon" style={{ backgroundColor: "hsl(var(--chart-4))" }}>
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
    </div>
  );
}
