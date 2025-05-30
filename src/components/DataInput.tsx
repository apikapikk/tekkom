"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  targetTime: number;
  onChangeTime: (value: number) => void;
  onCalculate: () => void;
}

export default function DataInput({ targetTime, onChangeTime, onCalculate }: Props) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label htmlFor="target-time">Jam yang ingin diperkirakan</Label>
        <Input
          id="target-time"
          type="number"
          value={targetTime}
          onChange={(e) => onChangeTime(parseFloat(e.target.value))}
          placeholder="Contoh: 13.5"
        />
      </div>
      <Button onClick={onCalculate}>
        Hitung Suhu
      </Button>
    </div>
  );
}
