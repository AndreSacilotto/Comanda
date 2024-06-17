import { Socket, io } from "socket.io-client";
import { ParentComponent, VoidComponent, For, createSignal, Switch, Match } from 'solid-js';
import { Comanda } from "shared/comanda";
import { ServerToClientEvents, ClientToServerEvents } from "shared/commands";
import { HourMinutes } from "../util/util_date";
import Login from "./Login";
import Edit from "./Edit";

const stateEnum = {
	Waiting: 0,
	Login: 1,
	Catalog: 2,
	EditMode: 3, 
}

export const Catalog: VoidComponent = () =>
{
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3333");

	const [getChar, setChar] = createSignal({ name: "Guest", color: "black" });
	const [getState, setState] = createSignal<number>(stateEnum.Waiting); // 1 = login | 2 = catalog | 3 = edit
	
	const [getComandas, setComandas] = createSignal<Comanda[]>([]);
	const [getEditId, setEditId] = createSignal<number>(-1);

	socket.on("connect", () => {
		setState(stateEnum.Login);
	});

	socket.on("comandas_state", (comandas) => {
		console.log(comandas);
		setComandas(comandas);
	});

	socket.on("new_comanda", (comanda) => {
		setComandas(items => [...items, comanda]);
	});

	socket.on("delete_comanda", (comandaId) => {
		setComandas(items => items.filter(x => x.identifier !== comandaId));
	});

	socket.on("update_comanda", (comanda) => {
		setComandas(items => items.map(item => item.identifier === comanda.identifier ? comanda : item));
	});

	function Add()
	{
		// Ask server to add a new comanda
		socket.emit("new_comanda", getChar().name);
	}

	function Remove(identifier: number)
	{
		// Ask server to delete a given comanda
		socket.emit("delete_comanda", identifier);
	}

	function onSubmitEdit(title: string, notes: string, items: string[])
	{
		setState(stateEnum.Catalog);
		// Send server the updated comanda info
		socket.emit("update_comanda", getEditId(), title, notes, items);
	}

	function onLogin(name: string, color: string)
	{
		setChar({ name, color });
		setState(stateEnum.Catalog);
		
		socket.emit("comandas_state");
	}

	function EnterEditMode(item: Comanda)
	{
		setEditId(item.identifier);
		setState(stateEnum.EditMode);
	}
	function ExitEditMode()
	{
		setState(stateEnum.Catalog);
		setEditId(-1);
	}
	function RefreshEditMode()
	{
		socket.emit("refresh_comanda", getEditId());
	}

	return (
		<Switch fallback={<p>Waiting...</p>}>
			<Match when={getState() === stateEnum.Login}>
				<Login onSubmit={onLogin} />
			</Match>
			<Match when={getState() === stateEnum.Catalog}>
				<div class="pt-6">
					<div style={{ "color": getChar().color }} class="text-center">{getChar().name}</div>
					<div class="flex flex-col gap-4 mx-2">
						<For each={getComandas()}>{(item, _i) =>
							<CatalogItem creator={item.creator || ""} time={item.time} onDelete={() => Remove(item.identifier)} onEdit={() => EnterEditMode(item)}>{item.title}</CatalogItem>
						}</For>
						<div class="flex w-full justify-center select-none" >
							<button class="border border-black border-dotted w-1/2 rounded bg-white" onClick={Add}>
								<span class="text-white text-3xl [-webkit-text-stroke:_1px_black]">+</span>
							</button>
						</div>
					</div>
				</div>
			</Match>
			<Match when={getState() === stateEnum.EditMode}>
				<Edit comanda={getComandas()[getEditId()]} onSubmit={onSubmitEdit} onRefresh={RefreshEditMode} onExit={ExitEditMode} />
			</Match>
		</Switch>
	);
};

export type MouseHtmlEvent = MouseEvent & { currentTarget: HTMLButtonElement; target: Element; };

export interface CatalogItemProps
{
	creator: string,
	time: number,
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
				{props.creator} {HourMinutes(new Date(props.time), ":")}
			</div>
			<button class="bg-gray-500 text-white p-2 min-w-10" onClick={(ev) => props.onEdit?.(ev)}>
				EDIT
			</button>
			<button class="bg-red-500 text-white p-2 min-w-10" onClick={(ev) => props.onDelete?.(ev)}>
				DELETE
			</button>
		</div>
	);
};