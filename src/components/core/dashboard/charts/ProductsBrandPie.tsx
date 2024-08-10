import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useAppSelector } from "@/redux/store";
import { useMemo } from "react";
import { getRandomNumber } from "@/utils/random";

const ProductsBrandPie = () => {
  const products = useAppSelector((state) => state.product.products);

  const chartMainData = useMemo(() => {
    const productCountAsPerBrand: Record<string, number> = {};
    products.forEach((product) => {
      const brand = product.brand || "Unknown";

      if (productCountAsPerBrand[brand] === undefined) {
        productCountAsPerBrand[brand] = 1;
      } else {
        productCountAsPerBrand[brand]++;
      }
    });

    return {
      // - 1 is for unknown brands
      brandLength: Object.keys(productCountAsPerBrand).length - 1,
      chartData: Object.entries(productCountAsPerBrand).map(([brand, total]) => {
        return { brand: brand, count: total, fill: `var(--color-${brand.toLowerCase()})` };
      }),
      chartConfig: Object.fromEntries(
        Object.entries(productCountAsPerBrand).map(([brand]) => {
          return [brand.toLowerCase(), { label: brand, color: `hsl(var(--chart-${getRandomNumber(1, 25)}))` }];
        })
      ) satisfies ChartConfig,
    };
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Product's and Brands</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartMainData.chartConfig} className="mx-auto aspect-square min-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartMainData.chartData} dataKey="count" nameKey="brand" innerRadius={60} strokeWidth={5}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {chartMainData.brandLength}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          Brands
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">Showing total products as per brand</div>
      </CardFooter>
    </Card>
  );
};

export default ProductsBrandPie;
