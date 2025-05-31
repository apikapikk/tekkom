"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  onSubmit: (data: { time: number; temp: number }[]) => void;
}

const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

export default function WeeklyStepper({ onSubmit }: Props) {
  const [temps, setTemps] = useState<number[]>(Array(7).fill(28));
  const [currentDay, setCurrentDay] = useState(0);

  const handleChange = (value: number) => {
    const newTemps = [...temps];
    newTemps[currentDay] = value;
    setTemps(newTemps);
  };

  const handleNext = () => {
    if (currentDay < 6) setCurrentDay(currentDay + 1);
  };

  const handlePrev = () => {
    if (currentDay > 0) setCurrentDay(currentDay - 1);
  };

  const handleSubmit = () => {
    const data = temps.map((temp, index) => ({ time: index, temp }));
    onSubmit(data);
  };

  return (
    <Card className="p-4 space-y-4">
      <CardContent className="space-y-4">
        <h2 className="text-lg font-semibold text-center">Input Suhu Mingguan</h2>
        <div className="space-y-2 text-center">
          <Label className="text-base">{dayNames[currentDay]}</Label>
          <Input
            type="number"
            value={temps[currentDay]}
            onChange={(e) => handleChange(parseFloat(e.target.value))}
            className="text-center w-32 mx-auto"
          />
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="secondary" onClick={handlePrev} disabled={currentDay === 0}>
            ← Sebelumnya
          </Button>
          <Button variant="secondary" onClick={handleNext} disabled={currentDay === 6}>
            Selanjutnya →
          </Button>
        </div>

        {currentDay === 6 && (
          <Button onClick={handleSubmit} className="mt-4 w-full">
            Hitung Interpolasi
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
