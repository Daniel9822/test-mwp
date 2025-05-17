import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoreVertical, Eye, ArrowRight, ArrowUpRight, Info } from "lucide-react";
import PaymentsOverview from "@/components/dashboard/PaymentsOverview";
import CreditCard from "@/components/dashboard/CreditCard";
import QuickTransfer from "@/components/dashboard/QuickTransfer";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header with breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-medium">Payments</h1>
          <div className="flex items-center gap-2 text-sm mt-1">
            <span className="text-muted-foreground">Osen</span>
            <span className="text-muted-foreground">&gt;</span>
            <span className="text-muted-foreground">Dashboard</span>
            <span className="text-muted-foreground">&gt;</span>
            <span>Payments</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Total Balance Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Total Balance</h2>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <h3 className="text-3xl font-semibold">$92,652.36</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-4">
                <Button className="px-6 gap-2">
                  <span className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span>Transfer</span>
                </Button>
                <Button variant="outline" className="border-blue-400/20 bg-blue-400/10 text-blue-400 px-6 gap-2 hover:bg-blue-400/20">
                  <span className="h-6 w-6 rounded-full bg-blue-400/20 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  <span>Request</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Income and Expense Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Income Card */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                      <path d="M12 18V6" />
                    </svg>
                  </div>
                  <h3 className="text-muted-foreground">Total Income</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-negative text-xs px-2 py-0.5 bg-red-500/10 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      0.93%
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-medium">$105.3k</h3>

                {/* Mini Chart */}
                <div className="h-20 mt-4">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path d="M0,15 Q10,5 20,15 T40,15 T60,10 T80,20 T100,15" fill="none" stroke="hsl(var(--chart-5))" strokeWidth="2" />
                  </svg>
                </div>
              </CardContent>
            </Card>

            {/* Expense Card */}
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8 12h8" />
                      <path d="M12 16V8" />
                    </svg>
                  </div>
                  <h3 className="text-muted-foreground">Total Expense</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-positive text-xs px-2 py-0.5 bg-green-500/10 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      8.72%
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-medium">$78.2k</h3>

                {/* Mini Chart */}
                <div className="h-20 mt-4">
                  <svg viewBox="0 0 100 30" className="w-full h-full">
                    <path d="M0,15 L10,10 L20,20 L30,5 L40,15 L50,10 L60,20 L70,5 L80,15 L90,5 L100,15" fill="none" stroke="hsl(var(--chart-1))" strokeWidth="2" />
                    <path d="M0,15 L10,10 L20,20 L30,5 L40,15 L50,10 L60,20 L70,5 L80,15 L90,5 L100,15" strokeWidth="0" fill="url(#gradient)" opacity="0.2" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--chart-1))" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="hsl(var(--chart-1))" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>

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

        {/* Right Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Credit Card */}
          <CreditCard />

          {/* Account Balance */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-muted-foreground">Balance:</h3>
                <Button variant="link" className="p-0 h-auto text-primary">
                  View Details
                </Button>
              </div>
              <div className="flex items-end mt-1 gap-1">
                <span className="text-2xl font-semibold">$38562.25</span>
                <span className="text-muted-foreground text-sm mb-1">USD</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Transfer */}
          <QuickTransfer />
        </div>
      </div>
    </div>
  );
}
