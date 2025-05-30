"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function SuhuStepper({
  jam,
  value,
  onChange,
}: {
  jam: number;
  value: number;
  onChange: (newVal: number) => void;
}) {
  const minSuhu = 0;
  const maxSuhu = 50;

  return (
    <div className="flex items-center gap-4 mb-2">
      <Label className="w-16">Jam {jam}</Label>
      <Button
        variant="outline"
        onClick={() => onChange(Math.max(minSuhu, value - 1))}
      >
        −
      </Button>
      <div className="w-12 text-center">{value}°C</div>
      <Button
        variant="outline"
        onClick={() => onChange(Math.min(maxSuhu, value + 1))}
      >
        +
      </Button>
    </div>
  );
}

interface InputRentangProps {
  onSubmit: (data: { time: number; temp: number }[], targetTime: number) => void;
}

export default function InputRentang({ onSubmit }: InputRentangProps) {
  const [start, setStart] = useState(10);
  const [end, setEnd] = useState(14);
  const [target, setTarget] = useState(12.5);

  // suhu per jam, kunci: jam, nilai: suhu
  const [temps, setTemps] = useState<Record<number, number>>({});

  // Reset temps ketika start atau end berubah
  useEffect(() => {
    const newTemps: Record<number, number> = {};
    for (let i = start; i <= end; i++) {
      newTemps[i] = temps[i] ?? 25; // default 25°C
    }
    setTemps(newTemps);
  }, [start, end]);

  const handleSubmit = () => {
    if (start > end) return alert("Jam awal harus lebih kecil dari jam akhir");
    if (target < start || target > end)
      return alert("Jam target harus di antara jam awal dan jam akhir");

    // cek suhu semua sudah terisi
    for (let i = start; i <= end; i++) {
      if (temps[i] === undefined || isNaN(temps[i])) {
        return alert(`Suhu untuk jam ${i} belum diisi`);
      }
    }

    // ubah ke array data
    const data = [];
    for (let i = start; i <= end; i++) {
      data.push({ time: i, temp: temps[i] });
    }

    onSubmit(data, target);
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <Label>Jam Awal</Label>
          <Input
            type="number"
            min={0}
            max={23}
            value={start}
            onChange={(e) => setStart(Math.min(Math.max(0, +e.target.value), 23))}
          />
        </div>
        <div className="flex flex-col">
          <Label>Jam Akhir</Label>
          <Input
            type="number"
            min={0}
            max={23}
            value={end}
            onChange={(e) => setEnd(Math.min(Math.max(0, +e.target.value), 23))}
          />
        </div>
        <div className="flex flex-col">
          <Label>Jam Target</Label>
          <Input
            type="number"
            step={0.5}
            min={0}
            max={23}
            value={target}
            onChange={(e) =>
              setTarget(Math.min(Math.max(0, +e.target.value), 23))
            }
          />
        </div>
      </div>

      <div className="border rounded-md p-4">
        <h4 className="mb-2 font-semibold">Input Suhu per Jam</h4>
        {Array.from({ length: end - start + 1 }, (_, idx) => {
          const jam = start + idx;
          return (
            <SuhuStepper
              key={jam}
              jam={jam}
              value={temps[jam]}
              onChange={(val) =>
                setTemps((prev) => ({ ...prev, [jam]: val }))
              }
            />
          );
        })}
      </div>

      <Button className="w-full" onClick={handleSubmit}>
        Hitung Interpolasi
      </Button>
    </div>
  );
}
