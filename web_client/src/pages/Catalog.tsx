import { ParentComponent, VoidComponent, For, createSignal, Switch, Match } from 'solid-js';
import { HourMinutes } from "../util/util_date";
import Login from "./Login";
import Edit from "./Edit";

export type MouseHtmlEvent = MouseEvent & { currentTarget: HTMLButtonElement; target: Element; };

export interface CatalogItemProps
{
	edit?: string,
	creator: string,
	time: Date,
	onDelete?: (ev: MouseHtmlEvent) => void,
	onEdit?: (ev: MouseHtmlEvent) => void,
}

export const CatalogItem: ParentComponent<CatalogItemProps> = (props) =>
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

export interface ComandaInfo
{
	identifier: number,
	creator?: string
	content: string
	editing: string
	time: Date
}

export const Catalog: VoidComponent = () =>
{
	let counter = 0;

	const [getChar, setChar] = createSignal({ name: "", color: "black" });
	const [getState, setState] = createSignal<number>(0); // 0 = login | 1 = catalog | 2 = edit

	const [getComandas, setComandas] = createSignal<ComandaInfo[]>([
		{ identifier: counter++, creator: "kel", editing: "BC", content: "A", time: new Date() },
		{ identifier: counter++, creator: "zana", editing: "", content: "B", time: new Date() },
		{ identifier: counter++, content: "C", editing: "", time: new Date() },
	]);
	const [getEditId, setEditId] = createSignal<number>(-1);


	function onLogin(name: string, color: string)
	{
		setChar({ name, color });
		setState(1);
	}

	function Add()
	{
		// TODO: Send to server to add a new comanda
		setComandas(items => [...items, { identifier: counter++, editing: "", content: "new", time: new Date() }]);
	}

	function Remove(id: number)
	{
		// TODO: Send to server to remove a comanda
		setComandas(items => items.filter(x => x.identifier !== id));
	}

	function EnterEdit(item: ComandaInfo)
	{
		if (item.editing === ""){
			setEditId(item.identifier);
			setState(2);
			// TODO: Send server to block the comanda
		}
		else
			console.log("Not enter");
	}

	function onSubmitEdit(id: number, title: string, other: string, items: string[])
	{
		setState(1);
		// TODO: Send server the infos and unblock the comanda
	}

	return (
		<Switch fallback={<p>Waiting...</p>}>
			<Match when={getState() === 0}>
				<Login onSubmit={onLogin} />
			</Match>
			<Match when={getState() === 1}>
				<div class="pt-6">
					<div style={{ "color": getChar().color }} class="text-center">{getChar().name}</div>
					<div class="flex flex-col gap-4 mx-2">
						<For each={getComandas()}>{(item, _i) =>
							<CatalogItem creator={item.creator || ""} edit={item.editing} time={item.time} onDelete={() => Remove(item.identifier)} onEdit={() => EnterEdit(item)}>{item.content}</CatalogItem>
						}</For>
						<div class="flex w-full justify-center select-none" >
							<button class="border border-black border-dotted w-1/2 rounded bg-white" onClick={Add}>
								<span class="text-white text-3xl [-webkit-text-stroke:_1px_black]">+</span>
							</button>
						</div>
					</div>
				</div>
			</Match>
			<Match when={getState() === 2}>
				<Edit id={getEditId()} onSubmit={onSubmitEdit} />
			</Match>
		</Switch>
	);
};
