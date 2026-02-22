export const ThemeColors = {
  primary: '#000000',
  secondary: '#ffffff'
};

export function getAccentRgba(alpha: number = 1): string {
  return `rgba(0, 255, 255, ${alpha})`;
}

export function getAccentHex(): string {
  return customAccentColor ?? '#00ffff';
}

let customAccentColor: string | null = null;

export function setCustomAccentColor(hex: string): void {
  customAccentColor = hex;
}

export function clearCustomAccentColor(): void {
  customAccentColor = null;
}

export function getCurrentAccentHex(): string {
  return customAccentColor ?? '#00ffff';
}

export function getAccentColor(): { hex: string; r: number; g: number; b: number } {
  const hex = getCurrentAccentHex();
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { hex, r, g, b };
}
