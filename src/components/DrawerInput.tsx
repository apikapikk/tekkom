"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  onSubmit: (
    data: { time: number; temp: number }[],
    targetTime: number
  ) => void;
};

export default function SheetInput({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState(10);
  const [endTime, setEndTime] = useState(14);
  const [targetTime, setTargetTime] = useState(12.5);
  const [temps, setTemps] = useState<number[]>([25, 26, 28, 27, 26]);

  const handleSubmit = () => {
    const data = [];
    for (let t = startTime; t <= endTime; t++) {
      data.push({ time: t, temp: temps[t - startTime] });
    }
    onSubmit(data, targetTime);
    setOpen(false);
  };

  const handleTimeRangeChange = (
    type: "start" | "end",
    value: number
  ) => {
    if (type === "start") {
      setStartTime(value);
      const length = endTime - value + 1;
      setTemps((prev) => Array.from({ length }, (_, i) => prev[i] ?? 25));
    } else {
      setEndTime(value);
      const length = value - startTime + 1;
      setTemps((prev) => Array.from({ length }, (_, i) => prev[i] ?? 25));
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Input Data</Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[90vw] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Input Data Suhu</SheetTitle>
        </SheetHeader>

        {/* Tambahkan padding dan spacing antar elemen */}
        <div className="mt-4 p-4 space-y-6">
          {/* Rentang waktu */}
          <div>
            <Label className="mb-1 block">Jam Awal</Label>
            <Input
              type="number"
              value={startTime}
              onChange={(e) =>
                handleTimeRangeChange("start", Number(e.target.value))
              }
            />
          </div>

          <div>
            <Label className="mb-1 block">Jam Akhir</Label>
            <Input
              type="number"
              value={endTime}
              onChange={(e) =>
                handleTimeRangeChange("end", Number(e.target.value))
              }
            />
          </div>

          {/* Target waktu */}
          <div>
            <Label className="mb-1 block">Jam yang Ingin Diperkirakan</Label>
            <Input
              type="number"
              step="0.1"
              value={targetTime}
              onChange={(e) => setTargetTime(Number(e.target.value))}
            />
          </div>

          {/* Data suhu */}
          <div>
            <Label className="mb-2 block">Data Suhu (°C)</Label>
            <div className="space-y-4">
              {Array.from({ length: endTime - startTime + 1 }).map((_, i) => (
                <div key={i}>
                  <Label className="mb-1 block">
                    Jam {startTime + i}
                  </Label>
                  <Input
                    type="number"
                    value={temps[i]}
                    onChange={(e) => {
                      const newTemps = [...temps];
                      newTemps[i] = Number(e.target.value);
                      setTemps(newTemps);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SheetFooter className="mt-6 p-4">
          <Button className="w-full" onClick={handleSubmit}>
            Hitung Interpolasi
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
