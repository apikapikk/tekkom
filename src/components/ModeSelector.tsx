"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Mode = "daily" | "weekly";

interface Props {
  onChange: (mode: Mode) => void;
  value: Mode;
}

export default function ModeSelector({ onChange, value }: Props) {
  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg shadow-lg max-w-md">
      <Label className="text-lg font-semibold text-white">Pilih Mode Input</Label>
      <RadioGroup
        defaultValue={value}
        value={value}
        onValueChange={(val: string) => onChange(val as Mode)}
        className="flex gap-6"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="daily" id="daily" className="ring-offset-gray-900" />
          <Label htmlFor="daily" className="text-white cursor-pointer">
            Harian (24 jam)
          </Label>
        </div>
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="weekly" id="weekly" className="ring-offset-gray-900" />
          <Label htmlFor="weekly" className="text-white cursor-pointer">
            Mingguan (Senin - Minggu)
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}
