export function arrayInsertAt<T>(array: T[], index: number, ...item: T[]) {
	array.splice(index, 0, ...item);
}

export function arrayRemoveOnce<T>(arr: T[], value : T)
{
	const index = arr.indexOf(value);
	if (index !== -1)
		arr.splice(index, 1);
	return arr;
}

export function arrayRemoveAll<T>(arr: T[], value : T)
{
	for (let i = arr.length-1; i >= 0; i--)
		if (arr[i] === value)
			arr.splice(i, 1);
	return arr;
}

export function mapEntries<T>(obj: { [s: string]: T; } | ArrayLike<T>)
{
	return Object.entries(obj).map(x => { return { key: x[0], value: x[1] }});
}