import { parseISO, format } from "date-fns";
export const parse = (utc: string) => parseISO(utc);
export const fmt = (date: Date, fmt: string) => format(date, fmt);
