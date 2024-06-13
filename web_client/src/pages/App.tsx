import type { VoidComponent } from 'solid-js';
import Catalog from "./Catalog";
// import Edit from "./Edit";

const App: VoidComponent = () =>
{
	return (
		<>
			<Catalog />
			<button class="bg-green-500 fixed bottom-0 w-full rounded-t-full text-2xl text-white">+</button>
		</>
	);
};

export default App;
