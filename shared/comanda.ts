export class Comanda
{
	identifier: number
	creator: string
	time: number
	items: string[]
	title: string
	notes: string
	constructor(identifier: number, creator: string)
	{
		this.identifier = identifier;
		this.time = new Date().getTime();
		this.creator = creator;
		this.title = "";
		this.notes = "";
		this.items = [];
	}
}

export default Comanda;