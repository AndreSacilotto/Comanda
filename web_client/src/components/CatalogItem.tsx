import type { VoidComponent } from 'solid-js';

const CatalogItem: VoidComponent = () =>
{
	return (
		<div class="border border-black border-solid rounded-l-full hover:border-teal-300 select-none flex mx-2">
			<div class="flex-1 p-3">
				CONTENT
			</div>
			<div class="min-w-1/2">
				<div class="bg-gray-500 text-white h-1/2">
					EDIT
				</div>
				<div class="bg-red-500 text-white h-1/2">
					DELETE
				</div>
			</div>
		</div>
	);
};

export default CatalogItem;
