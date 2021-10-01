import { parse, format } from 'date-fns';

const apiDateFormat = 'yyyy-MM-dd';

export function formatDateToApiDate(date: Date): ApiDate {
    return format(date, apiDateFormat) as ApiDate;
}

export function prettifyApiDate(date: ApiDate): string {
    return format(parse(date, apiDateFormat, new Date()), 'dd.MM');
}
