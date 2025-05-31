import WeeklyStepper from "@/components/WeeklyInput";
import DailyStepper from "@/components/DailyInput";
import TemperatureChartCard from "@/components/TemperatureChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { stirlingInterpolation } from "@/lib/stirling";
import ResizeableLayout from "@/components/ResizeableLayout";

export default function HomePage() {
  const [data, setData] = useState<{ time: number; temp: number }[]>([]);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (inputData: typeof data) => {
    setData(inputData);
    const midpoint = Math.floor(inputData.length / 2);
    const target = inputData[midpoint].time;
    setTargetTime(target);
    const interpolated = stirlingInterpolation(inputData, target);
    setResult(interpolated);
  };

  return (
    <main className="p-6">
      <ResizeableLayout
        leftTop={
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="daily">Harian</TabsTrigger>
              <TabsTrigger value="weekly">Mingguan</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <DailyStepper onSubmit={handleSubmit} />
            </TabsContent>
            <TabsContent value="weekly">
              <WeeklyStepper onSubmit={handleSubmit} />
            </TabsContent>
          </Tabs>
        }
        leftBottom={
          <div>
            {/* Contoh konten hasil output bawah input */}
            <h3 className="text-lg font-semibold mb-2">Output Tambahan</h3>
            {result !== null && targetTime !== null ? (
              <p>Hasil interpolasi di {targetTime} ≈ {result.toFixed(3)}°C</p>
            ) : (
              <p>Masukkan data untuk melihat hasil</p>
            )}
          </div>
        }
        right={
          <div>
            {data.length > 0 && targetTime !== null && (
              <TemperatureChartCard
                data={data}
                interpolated={{ time: targetTime, temp: result! }}
              />
            )}
          </div>
        }
      />
    </main>
  );
}
