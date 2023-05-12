import { Dayjs } from 'dayjs';

export const convertDateDayJs = (date: Dayjs): string => {
	const year = date.year();
	const day = +date.date() < 10 ? `0${date.date()}` : date.date();
	const month = date.month() < 10 ? `0${date.month() + 1}` : date.month() + 1;

	return `${year}.${month}.${day}`;
};

export const convertDate = (dateString: Date | string) => {
	const date = new Date(dateString);
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};
