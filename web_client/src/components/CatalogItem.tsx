import type { ParentComponent } from 'solid-js';
import { HourMinutes } from "../util/util_date";

export type MouseHtmlEvent = MouseEvent & { currentTarget: HTMLButtonElement; target: Element; };

export interface Props
{
	edit?: string,
	creator: string,
	time: Date,
	onDelete?: (ev: MouseHtmlEvent) => void,
	onEdit?: (ev: MouseHtmlEvent) => void,
}

const CatalogItem: ParentComponent<Props> = (props) =>
{
	return (
		<div class="flex h-12 gap-1 items-stretch border border-black border-solid rounded-l-full hover:border-teal-300 select-none">
			<div class="flex-1 self-center pl-3">
				{props.children}
			</div>
			<div class="self-center pl-3">
				{props.creator} {HourMinutes(props.time, ":")}
			</div>
			<button class="bg-gray-500 text-white p-2 min-w-10" onClick={(ev) => props.onEdit?.(ev)}>
				{props.edit || "EDIT"}
			</button>
			<button class="bg-red-500 text-white p-2 min-w-10" onClick={(ev) => props.onDelete?.(ev)}>
				DELETE
			</button>
		</div>
	);
};

export default CatalogItem;
