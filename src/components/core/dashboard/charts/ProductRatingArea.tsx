import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/redux/store";
import { useMemo } from "react";

const ProductRatingArea = () => {
  const products = useAppSelector((state) => state.product.products);

  const chartMainData = useMemo(() => {
    return {
      chartData: products.map((product) => {
        return {
          id: product.id,
          rating: product.rating,
          stock: product.stock,
        };
      }),
      chartConfig: {
        rating: {
          label: "Rating",
          color: "hsl(var(--chart-1))",
        },
        stock: {
          label: "Stock",
          color: "hsl(var(--chart-2))",
        },
      } satisfies ChartConfig,
    };
  }, []);

  return (
    <Card className="border-transparent bg-richblack-900 text-white">
      <CardHeader className="flex w-full items-center gap-2 space-y-0 border-transparent py-5 sm:flex-row">
        <CardTitle>Product's Rating and Quantity</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartMainData.chartConfig} className="min-h-[250px] w-full">
          <AreaChart data={chartMainData.chartData}>
            <defs>
              <linearGradient id="fillStock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-stock)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-stock)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillRating" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-rating)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-rating)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="id" tickLine={false} axisLine={false} tickMargin={8} minTickGap={32} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return value.id;
                  }}
                  indicator="dot"
                />
              }
            />
            <Area dataKey="rating" type="natural" fill="url(#fillRating)" stroke="var(--color-rating)" stackId="a" />
            <Area dataKey="stock" type="natural" fill="url(#fillStock)" stroke="var(--color-stock)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ProductRatingArea;
