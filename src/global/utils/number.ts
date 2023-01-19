export function toFixedAmount(num: number): number {
  const number = Math.round(num * 100) / 100;
  return number;
}
