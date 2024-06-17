import { VoidComponent, For, Show, createSignal, onCleanup, onMount, Index, createEffect, Switch, Match } from 'solid-js';
import { Portal } from "solid-js/web";
import { Comanda } from "shared/comanda";
import data from "../components/padaria";
import { mapEntries } from "../util/util_collections";

export interface Props
{
	comanda: Comanda,
	onRefresh: () => void,
	onExit: () => void,
	onSubmit: (title: string, notes: string, items: string[]) => void,
}

const modalEnum = Object.freeze({
	None: 0,
	Add: 1,
	Food: 2,
	Drink: 3,
	SandwichPresets: 4,
	SandwichBuilder: 5,
});

const baseModals = Object.freeze([
	{ name: "bebida", modal: modalEnum.Drink },
	{ name: "comidas", modal: modalEnum.Food },
	{ name: "lanches", modal: modalEnum.SandwichPresets },
]);

const Edit: VoidComponent<Props> = (props) =>
{
	const [getModal, setModal] = createSignal<number>(modalEnum.None);

	const [getSandwichBuilder, setSandwichBuilder] = createSignal<string[]>([]);

	const [getTitle, setTitle] = createSignal<string>("");
	const [getNotes, setNotes] = createSignal<string>("");
	const [getItems, setItems] = createSignal<string[]>([]);

	onMount(() => window.addEventListener('onhashchange', onBackButton))
	onCleanup(() => window.removeEventListener('onhashchange', onBackButton))

	createEffect(() => {
		setTitle(props.comanda.title);
		setNotes(props.comanda.notes);
		setItems(props.comanda.items);
	});

	function onBackButton()
	{
		console.log("back");
		exitModal();
	}

	function exitModal()
	{
		setModal(modalEnum.None);
	}

	return (
		<>
			<Show when={getModal() !== modalEnum.None}>
				<Portal>
					<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50" onClick={exitModal} />
					<Switch>
						<Match when={getModal() === modalEnum.Add}>
							<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-300 overflow-y-auto">
								<For each={baseModals}>{(item, _i) =>
									<button onClick={() => setModal(item.modal)} class="border border-black border-solid p-3">{item.name}</button>
								}</For>
							</div>
						</Match>
						<Match when={getModal() === modalEnum.Drink}>
							<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-300 overflow-y-auto">
								<For each={Object.keys(data.drinks)}>{(item, _i) =>
									<button class="border border-black border-solid p-3" onClick={() => setItems(x => [...x, item])}>{item}</button>
								}</For>
							</div>
						</Match>
						<Match when={getModal() === modalEnum.Food}>
							<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-300 overflow-y-auto">
								<For each={Object.keys(data.foods)}>{(item, _i) =>
									<button class="border border-black border-solid p-3" onClick={() => setItems(x => [...x, item])}>{item}</button>
								}</For>
							</div>
						</Match>
						<Match when={getModal() === modalEnum.SandwichPresets}>
							<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-300 overflow-y-auto">
								<For each={mapEntries(data.sandwichs.presets)}>{(item, _i) =>
									<button class="border border-black border-solid p-3" onClick={() => { setSandwichBuilder(() => [...item.value.items]); setModal(modalEnum.SandwichBuilder) }}>{item.key}</button>
								}</For>
							</div>
						</Match>
						<Match when={getModal() === modalEnum.SandwichBuilder}>
								<div class="fixed top-1/4 bottom-1/2 left-0 right-0 p-6 flex flex-row flex-wrap gap-2 bg-green-500 overflow-y-auto pt-12">
									<button class="absolute top-0 left-0 right-3/4 py-2 border border-solid border-red-500 bg-red-500 text-white" onClick={() => setSandwichBuilder([])}>Clear</button>
									<button class="absolute top-0 left-3/4 right-0 py-2 border border-solid border-blue-500 bg-blue-500 text-white" onClick={() => { setItems(x => [...x, getSandwichBuilder().join(" ")]); setSandwichBuilder([]); exitModal(); }}>Save</button>
									<Index each={getSandwichBuilder()}>{(item, i) =>
										<button class="border border-black border-solid p-2 max-h-12" onClick={() => setSandwichBuilder(x => x.filter((_item, index) => i !== index))}>{item()}</button>
									}</Index>
								</div>
								<div class="fixed top-1/2 bottom-0 left-0 right-0 p-6 flex flex-row flex-wrap justify-center gap-2 bg-slate-500 overflow-y-auto">
									<For each={Object.keys(data.sandwichs.items)}>{(item, _i) =>
										<button onClick={() => setSandwichBuilder(x => [...x, item])} class="border border-black border-solid p-3">{item}</button>
									}</For>
								</div>
						</Match>
					</Switch>
				</Portal>
			</Show>

			<div class="pt-6 px-4">
				<div class="flex items-center">
					<div class="p-2 m-1 border border-black border-solid rounded-full">{props.comanda.identifier || "?"}</div>
					<input type="text" placeholder="Client (opt)" value={getTitle()} onChange={(ev) => setTitle(ev.target.value)} class="block p-3 w-full border border-black border-solid" />
				</div>

				<div class="flex gap-5 text-center justify-center m-3">
					<button class="flex-1 p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => setModal(modalEnum.Add) } >Add Item</button>
					<button class="p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => props.onRefresh()}>&#x21bb;</button>
					<button class="p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => props.onSubmit(getTitle(), getNotes(), getItems())}>Save</button>
					<button class="p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => props.onExit()}>Exit</button>
				</div>
				<hr class="m-3" />
				<div class="flex flex-col gap-2">
					<textarea placeholder="Notes" value={getNotes()} onChange={(ev) => setNotes(ev.target.value)} class="block px-3 py-2 w-full border border-black border-solid" />
					<For each={getItems()}>{(item, i) =>
						<div onClick={() => setItems(x => x.filter((_item, index) => i() !== index))} class="border border-black border-solid p-2">{item}</div>
					}</For>
				</div>
			</div>
		</>
	);
};

export default Edit;
