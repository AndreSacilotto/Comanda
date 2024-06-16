
export function DayMonthYear(time: Date, sep = " ") {
	return [time.getDay(), time.getMonth(), time.getFullYear].join(sep);
}

export function HourMinutes(time: Date, sep = " ") {
	return [time.getHours(), time.getMinutes()].join(sep);
}