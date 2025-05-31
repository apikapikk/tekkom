"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (data: { time: number; temp: number }[]) => void;
}

export default function DailyStepper({ onSubmit }: Props) {
  const [temps, setTemps] = useState<number[]>(Array(24).fill(25)); // default suhu
  const [currentHour, setCurrentHour] = useState(0);

  const handleChange = (value: number) => {
    const newTemps = [...temps];
    newTemps[currentHour] = value;
    setTemps(newTemps);
  };

  const handleNext = () => {
    if (currentHour < 23) setCurrentHour(currentHour + 1);
  };

  const handlePrev = () => {
    if (currentHour > 0) setCurrentHour(currentHour - 1);
  };

  const handleSubmit = () => {
    const data = temps.map((temp, time) => ({ time, temp }));
    onSubmit(data);
  };

  return (
    <Card className="p-4 space-y-4">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold text-center">Input Suhu 24 Jam</h2>
        <div className="space-y-2 text-center">
          <Label className="text-base">Jam {currentHour}:00</Label>
          <Input
            type="number"
            value={temps[currentHour]}
            onChange={(e) => handleChange(parseFloat(e.target.value))}
            className="text-center w-32 mx-auto"
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={handlePrev} disabled={currentHour === 0}>
            ← Sebelumnya
          </Button>
          <Button variant="secondary" onClick={handleNext} disabled={currentHour === 23}>
            Selanjutnya →
          </Button>
        </div>

        {currentHour === 23 && (
          <Button onClick={handleSubmit} className="mt-4 w-full">
            Hitung Interpolasi
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
