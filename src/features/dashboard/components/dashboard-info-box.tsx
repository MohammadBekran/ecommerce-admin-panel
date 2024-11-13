import type { LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IDashboardInfoBoxProps {
  title: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  description: string | number;
}

const DashboardInfoBox = ({
  title,
  icon: Icon,
  description,
}: IDashboardInfoBoxProps) => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{description}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardInfoBox;
