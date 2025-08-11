export const getMonthsFromNowToJanuary = (): string[] => {
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based index

  // Ambil bulan dari bulan sekarang sampai Januari (inklusif)
  const result: string[] = [];
  for (let i = currentMonth; i >= 0; i--) {
    result.push(months[i]);
  }
  return result;
};
