export function formatTime(dateString: string) {
  const date = new Date(dateString);
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = padZero(date.getFullYear());
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  if (new Date().getDate() === date.getDate()) {
    return `${hours}:${minutes}`
  }
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}
