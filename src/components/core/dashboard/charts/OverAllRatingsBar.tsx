import { Bar, BarChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";
import { getRandomNumber } from "@/utils/random";
import { useAppSelector } from "@/redux/store";

const OverAllRatingsBar = () => {
  const products = useAppSelector((state) => state.product.products);

  const chartMainData = useMemo(() => {
    const ratingsCount: Record<string, number> = {};
    products.forEach((product) => {
      const rounderRating = `${Math.round(product.rating)}`;
      if (ratingsCount[rounderRating] === undefined) {
        ratingsCount[rounderRating] = product.rating;
      } else {
        ratingsCount[rounderRating] = ratingsCount[rounderRating] + product.rating;
      }
    });

    return {
      brandLength: Object.keys(ratingsCount).length,
      chartData: Object.entries(ratingsCount).map(([rating, total]) => {
        return { rating: rating, count: Math.round(total), fill: `var(--color-${rating})` };
      }),
      chartConfig: Object.fromEntries(
        Object.entries(ratingsCount).map(([rating]) => {
          return [rating, { label: rating, color: `hsl(var(--chart-${getRandomNumber(1, 25)}))` }];
        })
      ) satisfies ChartConfig,
    };
  }, []);

  return (
    <Card className="border-transparent bg-transparent text-white">
      <CardHeader>
        <CardTitle>Total ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartMainData.chartConfig} className="h-[250px]">
          <BarChart
            accessibilityLayer
            data={chartMainData.chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="rating"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartMainData.chartConfig[value as keyof typeof chartMainData.chartConfig]?.label
              }
            />
            <XAxis dataKey="count" type="number" hide />
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="count" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total ratings count</div>
      </CardFooter>
    </Card>
  );
};

export default OverAllRatingsBar;
