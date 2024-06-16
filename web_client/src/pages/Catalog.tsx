import { VoidComponent, For, createSignal } from 'solid-js';
import CatalogItem from "../components/CatalogItem";

export interface ComandaInfo{
	identifier: number,
	content: string
	edit?: string
	creator?: string
	time: Date
}

const Catalog: VoidComponent = () =>
{
	let counter = 0;

	const [comandas, setComandas] = createSignal<ComandaInfo[]>([
		{ identifier: counter++, creator: "kel", content: "A", edit: "...", time: new Date() },
		{ identifier: counter++, creator: "zana", content: "B", time: new Date() },
		{ identifier: counter++, content: "C", time: new Date() },
	]);

	function Add() {
		setComandas(items => [...items, { identifier: counter++, content: "new", time: new Date() }]);
	}

	function Remove(id: number) {
		setComandas(items => items.filter(x => x.identifier !== id));
	}
	
	function Update() {
		console.log("Update");
	}

	return (
		<div class="pt-6">
			<div class="flex flex-col gap-4 mx-2">
				<For each={comandas()}>{(item, _i) =>
					<CatalogItem creator={item.creator || ""} edit={item.edit} time={item.time} onDelete={() => Remove(item.identifier)} onEdit={Update}>{item.content}</CatalogItem>
				}</For>
				<div class="flex w-full justify-center select-none" >
					<button class="border border-black border-dotted w-1/2 rounded bg-white" onClick={Add}>
						<span class="text-white text-3xl [-webkit-text-stroke:_1px_black;]">
							+
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Catalog;
