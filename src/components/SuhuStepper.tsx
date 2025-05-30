import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Props {
  jam: number;
  value: number;
  onChange: (newVal: number) => void;
}

export default function SuhuStepper({ jam, value, onChange }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Label className="w-16">Jam {jam}</Label>
      <Button variant="outline" onClick={() => onChange(value - 1)}>-</Button>
      <div className="w-12 text-center">{value}°C</div>
      <Button variant="outline" onClick={() => onChange(value + 1)}>+</Button>
    </div>
  );
}
