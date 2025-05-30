export function stirlingInterpolation(
 data: { time: number; temp: number }[],
 x: number
): number {
 const n = data.length;
 if (n % 2 === 0) throw new Error("Jumlah data harus ganjil");

 const h = data[1].time - data[0].time;
 const mid = Math.floor(n / 2);
 const x0 = data[mid].time;
 const y = data.map(d => d.temp);
 const u = (x - x0) / h;

 const diff = Array.from({ length: n }, () => Array(n).fill(0));
 for (let i = 0; i < n; i++) diff[i][0] = y[i];
 for (let j = 1; j < n; j++) {
   for (let i = 0; i < n - j; i++) {
     diff[i][j] = diff[i + 1][j - 1] - diff[i][j - 1];
   }
 }

 let result = y[mid];
 let fact = 1;
 let uTerm = 1;

 for (let i = 1; i <= Math.floor(n / 2); i++) {
   fact *= (2 * i - 1) * (2 * i);
   uTerm *= (u * u - (i - 1) ** 2);
   const delta = (diff[mid - i][2 * i - 1] + diff[mid - i + 1][2 * i - 1]) / 2;
   result += uTerm * delta / fact;
 }

 return result;
}
