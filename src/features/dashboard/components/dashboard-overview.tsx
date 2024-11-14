"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import IGraphData from "@/features/dashboard/core/types";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const DashboardOverview = ({ data }: { data: IGraphData[] }) => {
  const chartConfig = {
    desktop: {
      label: "Month",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Total",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#2498db" radius={[4, 4, 0, 0]} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default DashboardOverview;
