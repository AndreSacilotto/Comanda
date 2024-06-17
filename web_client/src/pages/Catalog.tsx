import { Socket, io } from "socket.io-client";
import { VoidComponent, createSignal, For, Switch, Match } from 'solid-js';
import { Comanda } from "shared/comanda";
import { ServerToClientEvents, ClientToServerEvents } from "shared/commands";
import { HourMinutes } from "../util/util_date";
import Login from "./Login";
import Edit from "./Edit";

const stateEnum = Object.freeze({
	Waiting: 0,
	Login: 1,
	Catalog: 2,
	EditMode: 3,
});

export const Catalog: VoidComponent = () =>
{
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://192.168.0.105:3333");

	const [getChar, setChar] = createSignal({ name: "Guest", color: "black" });
	const [getState, setState] = createSignal<number>(stateEnum.Waiting); // 1 = login | 2 = catalog | 3 = edit

	const [getComandas, setComandas] = createSignal<Comanda[]>([]);
	const [getEditId, setEditId] = createSignal<number>(-1);

	socket.on("connect", () =>
	{
		setState(stateEnum.Login);
	});
	socket.on("disconnect", () =>
	{
		setState(stateEnum.Login);
	});

	socket.on("comandas_state", (comandas) =>
	{
		console.log(comandas);
		setComandas(comandas);
	});

	socket.on("new_comanda", (comanda) =>
	{
		setComandas(items => [...items, comanda]);
	});

	socket.on("can_edit", (identifier) =>
	{
		EnterEditMode(identifier)
	});

	// eslint-disable-next-line solid/reactivity -- get() brings reactivity, but that dont matter we just want the current value
	socket.on("delete_comanda", (comandaId) =>
	{
		if (getState() === stateEnum.EditMode && getEditId() === comandaId)
			ExitEditMode();
		setComandas(items => items.filter(x => x.identifier !== comandaId));
	});

	socket.on("update_comanda", (comanda) =>
	{
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

	function EnterEditMode(identifier: number)
	{
		setEditId(identifier);
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
		<Switch fallback={<h1 class="text-center text-2xl">Waiting...</h1>}>
			<Match when={getState() === stateEnum.Login}>
				<Login onSubmit={onLogin} />
			</Match>
			<Match when={getState() === stateEnum.Catalog}>
				<div class="pt-6">
					<div style={{ "color": getChar().color }} class="text-center">{getChar().name}</div>
					<div class="flex flex-col gap-4 mx-2">
						<For each={getComandas()}>{(item, _i) =>
							<div class="flex h-12 gap-1 items-stretch border border-black border-solid rounded-l-full hover:border-teal-300 select-none">
								<div class="flex-1 self-center pl-3">{item.title}</div>
								<div class="self-center pl-3">{item.creator || "?"} {HourMinutes(new Date(item.time), ":")}</div>
								<button class="bg-gray-500 text-white p-2 min-w-10" onClick={() => EnterEditMode(item.identifier)}>EDIT</button>
								<button class="bg-red-500 text-white p-2 min-w-10" onClick={() => Remove(item.identifier)}>DELETE</button>
							</div>
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
				<Edit comanda={getComandas().find(x => x.identifier === getEditId())!} onSubmit={onSubmitEdit} onRefresh={RefreshEditMode} onExit={ExitEditMode} />
			</Match>
		</Switch>
	);
};
