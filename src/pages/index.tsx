import DrawerInput from "@/components/DrawerInput";
import TemperatureChartCard from "@/components/TemperatureChart";
import { useState } from "react";
import { stirlingInterpolation } from "@/lib/stirling"; // fungsi ini kita buat nanti

export default function HomePage() {
  const [data, setData] = useState<{ time: number; temp: number }[]>([]);
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = (inputData: typeof data, target: number) => {
    setData(inputData);
    setTargetTime(target);
    const interpolated = stirlingInterpolation(inputData, target);
    setResult(interpolated);
  };

  return (
    <main className="p-6 space-y-6">
      <DrawerInput onSubmit={handleSubmit} />

      {result !== null && (
        <div className="text-xl font-semibold">
          Hasil interpolasi di jam {targetTime} ≈ {result.toFixed(3)}°C
        </div>
      )}

      {data.length > 0 && targetTime !== null && (
        <TemperatureChartCard
          data={data}
          interpolated={{ time: targetTime, temp: result! }}
        />
      )}
    </main>
  );
}
