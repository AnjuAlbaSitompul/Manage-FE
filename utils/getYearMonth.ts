const indonesianMonths: { [key: string]: string } = {
  Januari: "01",
  Februari: "02",
  Maret: "03",
  April: "04",
  Mei: "05",
  Juni: "06",
  Juli: "07",
  Agustus: "08",
  September: "09",
  Oktober: "10",
  November: "11",
  Desember: "12",
};

export function getYearMonth(monthIndo: string, year: number): string {
  const month = indonesianMonths[monthIndo.trim()];
  if (!month) {
    throw new Error("Invalid Indonesian month name");
  }
  return `${year}-${month}`;
}
