export function todayIsoDate(): string {
  return new Date().toISOString().split('T')[0];
}

export function copyrightYear(): number {
  return new Date().getFullYear();
}
