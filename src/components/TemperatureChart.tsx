"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter
} from "recharts";

interface Props {
  data: { time: number; temp: number }[];
  interpolated: { time: number; temp: number } | null;
}

export default function TemperatureChartCard({ data, interpolated }: Props) {
  const chartData = data.map((d) => ({ time: d.time, temperature: d.temp }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Suhu</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{ value: "Jam", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis
              label={{ value: "Suhu (°C)", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#3b82f6"
              strokeWidth={2}
              dot
            />
            {interpolated && (
              <Scatter
                data={[{ time: interpolated.time, temperature: interpolated.temp }]}
                fill="#ef4444"
                shape="circle"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
