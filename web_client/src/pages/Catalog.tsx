import type { VoidComponent } from 'solid-js';
import CatalogItem from "../components/CatalogItem";

const Catalog: VoidComponent = () =>
{
	return (
		<div>
			<div class="flex flex-col gap-4">
				<CatalogItem />
				<CatalogItem />
				<CatalogItem />
			</div>
		</div>
	);
};

export default Catalog;
