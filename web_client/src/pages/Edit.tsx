import { VoidComponent, For, Show, createSignal, onCleanup, onMount, Index, createEffect } from 'solid-js';
import { Portal } from "solid-js/web";
import { Comanda } from "shared/comanda";
import data from "../components/padaria";

export interface Props
{
	comanda: Comanda,
	onRefresh: () => void,
	onExit: () => void,
	onSubmit: (title: string, notes: string, items: string[]) => void,
}

const Edit: VoidComponent<Props> = (props) =>
{
	const options = ["bebida", "comidas", "lanche"]

	const [getModal, setModal] = createSignal<boolean>(false);

	const [getShowAdd, setShowAdd] = createSignal<boolean>(false);
	const [getShowFood, setShowFood] = createSignal<boolean>(false);
	const [getShowDrink, setShowDrink] = createSignal<boolean>(false);
	const [getShowSandwich, setShowSandwich] = createSignal<boolean>(false);

	const [getSandwichBuilder, setSandwichBuilder] = createSignal<string[]>([]);

	const [getTitle, setTitle] = createSignal<string>("");
	const [getNotes, setNotes] = createSignal<string>("");
	const [getItems, setItems] = createSignal<string[]>([]);

	onMount(() => window.addEventListener('onhashchange', onBackButton))
	onCleanup(() => window.removeEventListener('onhashchange', onBackButton))

	createEffect(() => setTitle(props.comanda.title))
	createEffect(() => setNotes(props.comanda.notes))
	createEffect(() => setItems(props.comanda.items))

	function onBackButton()
	{
		console.log("back");
		exitModal();
	}

	function onOptionSelect(index: number)
	{
		switch (index)
		{
			case 0:
				setShowDrink(true);
				break;
			case 1:
				setShowFood(true);
				break;
			case 2:
				setShowSandwich(true);
				break;
		}
		setShowAdd(false);
		setModal(true);
	}

	function exitModal()
	{
		setModal(false);
		setShowAdd(false);
		setShowDrink(false);
		setShowFood(false);
		setShowSandwich(false);
	}

	return (
		<>
			<Portal>
				<Show when={getModal()}>
					<div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0" onClick={exitModal} />
				</Show>
				<Show when={getShowAdd()}>
					<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-300 z-10 overflow-y-auto">
						<Index each={options}>{(item, i) =>
							<button onClick={() => onOptionSelect(i)} class="border border-black border-solid p-3">{item()}</button>
						}</Index>
					</div>
				</Show>
				<Show when={getShowDrink()}>
					<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-400 z-10 overflow-y-auto">
						<For each={Object.keys(data.drinks)}>{(item, _i) =>
							<button class="border border-black border-solid p-3" onClick={() => setItems(x => [...x, item])}>{item}</button>
						}</For>
					</div>
				</Show>
				<Show when={getShowFood()}>
					<div class="fixed top-1/2 bottom-0 left-0 right-0 flex flex-col gap-2 p-6 bg-slate-500 z-10 overflow-y-auto">
						<For each={Object.keys(data.foods)}>{(item, _i) =>
							<button class="border border-black border-solid p-3" onClick={() => setItems(x => [...x, item])}>{item}</button>
						}</For>
					</div>
				</Show>
			</Portal>
			<Show when={getShowSandwich()}>
				<div class="fixed top-1/4 bottom-1/2 left-0 right-0 p-6 flex flex-row flex-wrap gap-2 bg-green-500 z-10 overflow-y-auto pt-12">
					<button class="absolute top-0 left-0 right-3/4 py-2 border border-solid border-red-500 text-red-500" onClick={() => setSandwichBuilder([])}>Clear</button>
					<button class="absolute top-0 left-3/4 right-0 py-2 border border-solid border-blue-500 text-blue-500" onClick={() => { setItems(x => [...x, getSandwichBuilder().join(" ")]); setSandwichBuilder([]) }}>Save</button>
					<Index each={getSandwichBuilder()}>{(item, i) =>
						<button class="border border-black border-solid p-2 max-h-12" onClick={() => setSandwichBuilder(x => x.filter((_item, index) => i !== index))}>{item()}</button>
					}</Index>
				</div>
				<div class="fixed top-1/2 bottom-0 left-0 right-0 p-6 flex flex-row flex-wrap justify-center gap-2 bg-slate-500 z-10 overflow-y-auto">
					<For each={Object.keys(data.sandwichs.items)}>{(item, _i) =>
						<button onClick={() => setSandwichBuilder(x => [...x, item])} class="border border-black border-solid p-3">{item}</button>
					}</For>
				</div>
			</Show>
			<div class="pt-6 px-4">
				<div class="flex items-center">
					<div class="p-2 m-1 border border-black border-solid rounded-full">{props.comanda.identifier || -1}</div>
					<input type="text" placeholder="Client (opt)" value={getTitle()} onChange={(ev) => setTitle(ev.target.value)} class="block p-3 w-full border border-black border-solid" />
				</div>

				<div class="flex gap-6 text-center justify-center m-3">
					<button class="flex-1 p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => { setShowAdd(true); setModal(true); }} >Add Item</button>
					<button class="p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => props.onSubmit(getTitle(), getNotes(), getItems())}>Save</button>
					<button class="p-3 border border-black border-solid bg-black text-white font-bold" onClick={() => props.onRefresh()}>Refresh</button>
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
