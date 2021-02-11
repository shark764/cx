export const addDays = (date: Date, days: number) => {
  const res = new Date(Number(date));
  res.setDate(res.getDate() + days);
  return res;
};

export const getMonday = (d: Date) => {
  const d2 = new Date(d);
  const day = d2.getDay();
  const diff = d2.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  return new Date(d2.setDate(diff));
};

export const isSameDay = (date1: Date, date2: Date) => date1.getDate() === date2.getDate()
  && date1.getMonth() === date2.getMonth()
  && date1.getFullYear() === date2.getFullYear();
