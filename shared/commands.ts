import Comanda from "./comanda"

export interface ServerToClientEvents
{
	comandas_state: (comandas: Comanda[]) => void;
	new_comanda: (comanda: Comanda) => void;
	delete_comanda: (identifier: number) => void;
	update_comanda: (comanda: Comanda) => void;
	can_edit: (identifier: number) => void;
	refresh_comanda: (comanda: Comanda) => void;
}

export interface ClientToServerEvents
{
	comandas_state: () => void;
	new_comanda: (creator: string) => void;
	delete_comanda: (identifier: number) => void;
	update_comanda: (identifier: number, title: string, notes: string, items: string[]) => void;
	refresh_comanda: (identifier: number) => void;
}

export interface BothEvents
{
}

export interface SocketData
{
}
