import { useAppSelector } from "@/redux/store";
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMemo } from "react";

const chartConfig = {
  male: {
    label: "Male",
    color: "hsl(var(--chart-1))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

const getRange = (value: number): string => {
  if (value < 25) {
    return "0-24";
  } else if (value < 30) {
    return "25-29";
  } else if (value < 35) {
    return "30-34";
  } else if (value < 40) {
    return "35-39";
  } else if (value < 45) {
    return "40-44";
  } else {
    return "45+";
  }
};
const UserByAgeLine = () => {
  const users = useAppSelector((state) => state.users.users);

  const chartMainData = useMemo(() => {
    const maleAgeRec: Record<string, number> = {};
    const femaleAgeRec: Record<string, number> = {};

    users.forEach((user) => {
      const range = getRange(user.age);

      if (user.gender === "male") {
        if (maleAgeRec[range] === undefined) {
          maleAgeRec[range] = 1;
        } else {
          maleAgeRec[range]++;
        }
      } else {
        if (femaleAgeRec[range] === undefined) {
          femaleAgeRec[range] = 1;
        } else {
          femaleAgeRec[range]++;
        }
      }
    });

    return {
      chartData: [
        { gender: `20`, male: maleAgeRec["0-24"] | 0, female: femaleAgeRec["0-24"] | 0 },
        { gender: `25`, male: maleAgeRec["25-29"] | 0, female: femaleAgeRec["25-29"] | 0 },
        { gender: `30`, male: maleAgeRec["30-34"] | 0, female: femaleAgeRec["30-34"] | 0 },
        { gender: `35`, male: maleAgeRec["35-39"] | 0, female: femaleAgeRec["35-39"] | 0 },
        { gender: `40`, male: maleAgeRec["40-44"] | 0, female: femaleAgeRec["40-44"] | 0 },
        { gender: `45`, male: maleAgeRec["45+"] | 0, female: femaleAgeRec["45+"] | 0 },
      ],
      chartConfig: chartConfig,
    };
  }, []);

  return (
    <Card className=" bg-transparent text-white">
      <CardHeader>
        <CardTitle>TechGrow - Users by age</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartMainData.chartConfig}
          className="min-h-[250px] w-[23rem] 
          md:w-[30rem] lm:w-[40rem] h-full text-black"
        >
          <LineChart
            accessibilityLayer
            data={chartMainData.chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="gender"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line dataKey="male" type="monotone" stroke="var(--color-male)" strokeWidth={2} dot={false} />
            <Line dataKey="female" type="monotone" stroke="var(--color-female)" strokeWidth={2} dot={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing total visitors for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserByAgeLine;
