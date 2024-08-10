import { Pie, PieChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { useMemo } from "react";
import { useAppSelector } from "@/redux/store";
import { getRandomNumber } from "@/utils/random";

const GenderPie = () => {
  const users = useAppSelector((state) => state.users.users);

  const chartMainData = useMemo(() => {
    const genderCountAsUsers: Record<string, number> = {};
    users.forEach((user) => {
      if (genderCountAsUsers[user.gender] === undefined) {
        genderCountAsUsers[user.gender] = 1;
      } else {
        genderCountAsUsers[user.gender]++;
      }
    });

    return {
      genderLength: Object.keys(genderCountAsUsers),
      chartData: Object.entries(genderCountAsUsers).map(([gender, total]) => {
        return { gender: gender, count: total, fill: `var(--color-${gender.toLowerCase()})` };
      }),
      chartConfig: Object.fromEntries(
        Object.entries(genderCountAsUsers).map(([gender]) => {
          return [gender.toLowerCase(), { label: gender, color: `hsl(var(--chart-${getRandomNumber(1, 25)}))` }];
        })
      ) satisfies ChartConfig,
    };
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartMainData.chartConfig} className="mx-auto aspect-square min-h-[250px]">
          <PieChart>
            <Pie data={chartMainData.chartData} dataKey="count" />
            <ChartLegend
              content={<ChartLegendContent nameKey="gender" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GenderPie;
