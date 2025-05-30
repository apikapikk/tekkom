import React from "react";

interface Props {
  targetTime: number;
  result: number;
}

export default function ResultBox({ targetTime, result }: Props) {
  return (
    <div className="p-4 bg-green-100 border border-green-400 rounded">
      Suhu pada jam {targetTime} diperkirakan sekitar <b>{result.toFixed(2)}°C</b>
    </div>
  );
}
