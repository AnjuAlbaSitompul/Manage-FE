export function dateToIndonesianString(date?: Date): string | undefined {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  return date?.toLocaleDateString("id-ID", options);
}

export function dateToIndonesianTime(date?: Date): string | undefined {
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
    timeZoneName: "short",
  };
  return date?.toLocaleTimeString("id-ID", options);
}
