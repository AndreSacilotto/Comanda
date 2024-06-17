import { VoidComponent, For, createSignal } from 'solid-js';

export interface Props
{
	onSubmit: (name: string, color: string) => void,
}

const colors = Object.freeze(["black", "red", "green", "blue", "orange", "gold", "purple", "hotpink", "saddlebrown"])

const Login: VoidComponent<Props> = (props) =>
{
	const [color, setColor] = createSignal<number>(0);
	const [name, setName] = createSignal<string>("");

	function click(i: number)
	{
		setColor(i);
		console.log(colors[i]);
	}

	function login()
	{
		const str = name();
		// if(str.length > 2)
			props.onSubmit(str, colors[color()]);
	}

	return (
		<div class="flex flex-col flex-wrap justify-center items-center gap-4 h-full">
			<input type="text" style={{ "color": colors[color()], "border-color": colors[color()] }} placeholder="Name" class="text-xl w-10/12 px-2 border border-solid border-black" 
			value={name()} onChange={(ev) => setName(ev.target.value)} />
			<div class="flex flex-wrap gap-3">
				<For each={colors}>{(item, i) =>
					<button onClick={() => click(i())} style={{ background: item }} class="w-7 h-7 hover:p-3" classList={{"outline": color() === i()}} />
				}</For>
			</div>
			<input type="button" value={"Login"} onClick={login} class="h-6 border border-solid border-black w-1/2 hover:bg-slate-200 active:bg-slate-300" />
		</div>
	);
};

export default Login;
