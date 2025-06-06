import { format, parseISO, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date, formatStr: string = 'dd/MM/yyyy'): string => {
  if (!isValid(date)) return '';
  return format(date, formatStr, { locale: ptBR });
};

export const parseDate = (dateStr: string, formatStr: string = 'dd/MM/yyyy'): Date | null => {
  try {
    const parsedDate = parse(dateStr, formatStr, new Date());
    return isValid(parsedDate) ? parsedDate : null;
  } catch (error) {
    return null;
  }
};

export const getMonthName = (month: number): string => {
  const date = new Date(2025, month - 1, 1);
  return format(date, 'MMMM', { locale: ptBR });
};

export const getMonthYearKey = (month: number, year: number): string => {
  return `${year}-${month.toString().padStart(2, '0')}`;
};

export const parseMonthYearKey = (key: string): { month: number; year: number } => {
  const [year, month] = key.split('-').map(Number);
  return { month, year };
};

export const getDaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

export const getMonthsArray = (year: number): { value: string; label: string }[] => {
  const months = [];
  for (let i = 1; i <= 12; i++) {
    const monthKey = getMonthYearKey(i, year);
    const monthName = getMonthName(i);
    months.push({ value: monthKey, label: `${monthName} ${year}` });
  }
  return months;
};

export const getYearsArray = (startYear: number = 2025, endYear: number = 2030): number[] => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
};