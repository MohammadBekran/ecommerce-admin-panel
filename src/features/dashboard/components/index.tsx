import { CreditCard, DollarSign, Package } from "lucide-react";

import DashboardInfoBox from "@/features/dashboard/components/dashboard-info-box";
import DashboardOverview from "@/features/dashboard/components/dashboard-overview";
import getGraphRevenue from "@/features/dashboard/core/actions/get-graph-revenue.actions";
import getSalesCount from "@/features/dashboard/core/actions/get-sales-count.actions";
import getStuckCount from "@/features/dashboard/core/actions/get-stuck-count.actions";
import getTotalRevenue from "@/features/dashboard/core/actions/get-total-revenue.actions";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { priceFormatter } from "@/core/utils";

const Dashboard = async ({ storeId }: { storeId: string }) => {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const stuckCount = await getStuckCount(storeId);
  const graphRevenue = await getGraphRevenue(storeId);

  return (
    <div>
      <div className="space-y-4 mb-5">
        <div>
          <Heading title="Dashboard" description="Overview of your store" />
        </div>
        <Separator />
        <div className="grid lg:grid-cols-3 gap-4">
          <DashboardInfoBox
            title="Total Revenue"
            icon={DollarSign}
            description={priceFormatter.format(totalRevenue)}
          />
          <DashboardInfoBox
            title="Sales"
            icon={CreditCard}
            description={`+${salesCount}`}
          />
          <DashboardInfoBox
            title="Products In Stuck"
            icon={Package}
            description={stuckCount}
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DashboardOverview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
