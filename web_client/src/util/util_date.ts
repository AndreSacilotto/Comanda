
export function DayMonthYear(time: Date, sep = ":") {
	return [time.getDay(), time.getMonth(), time.getFullYear].join(sep);
}

export function HourMinutes(time: Date, sep = ":") {
	return [time.getHours(), leadingZero(time.getMinutes())].join(sep);
}

export function leadingZero(num: number) {
	if (num < 10)
		return '0' + num;
	return num;
}