export function daysSinceMonthStart(date: Date): Date {
  const test = new Date(date.getFullYear(), date.getMonth(), 1);

  return test;
}
export function daysSinceWeekStart(date: Date): Date {
  //monday is the first day of the week
  // return date

  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}
export function daysSinceLastYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}
export function daysSinceLastQuarter(date: Date): Date {
  // return the first day of the current quarter
  const quarter = Math.floor(date.getMonth() / 3);
  const firstDayOfQuarter = new Date(date.getFullYear(), quarter * 3, 1);
  return firstDayOfQuarter;
}
export function datesOfLastQuarter(): Date[] {
  const date = new Date();
  // return the first day of the last quarter and the last day of the last quarter
  const quarter = Math.floor(date.getMonth() / 3) - 1;
  const firstDayOfLastQuarter = new Date(date.getFullYear(), quarter * 3, 1);
  const lastDayOfLastQuarter = new Date(date.getFullYear(), quarter * 3 + 3, 0);
  return [firstDayOfLastQuarter, lastDayOfLastQuarter];
}
export function datesOfLastYear(): Date[] {
  const date = new Date();
  // return the first day of the last year and the last day of the last year
  const firstDayOfLastYear = new Date(date.getFullYear() - 1, 0, 1);
  const lastDayOfLastYear = new Date(date.getFullYear(), 0, 0);
  return [firstDayOfLastYear, lastDayOfLastYear];
}
