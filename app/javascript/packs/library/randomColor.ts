export default function randomColor(seed: number): string {
  return `#${Math.floor(Math.abs(Math.sin(seed) * 16777215)).toString(16)}`
}
