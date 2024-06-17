import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { BothEvents, ClientToServerEvents, ServerToClientEvents, SocketData } from "shared/commands";
import Comanda from "shared/comanda";

const app = express();
app.use(cors());
const server = createServer(app);

const port = process.env.PORT || 3333;

let comandaCounter = 0;
const comandas: Comanda[] = []

const io = new Server<ClientToServerEvents, ServerToClientEvents, BothEvents, SocketData>(server, {
	cors: {
		origin: ["http://localhost:4567"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on("connection", (socket) =>
{
	socket.on("comandas_state", () =>
	{
		socket.emit("comandas_state", comandas);
	});
	socket.on("new_comanda", (creator) =>
	{
		const c = new Comanda(comandaCounter++, creator);
		comandas.push(c);
		io.sockets.emit("new_comanda", c);
		socket.emit("can_edit", c.identifier);
	});
	socket.on("delete_comanda", (identifier) =>
	{
		const index = comandas.findIndex(item => item.identifier === identifier);
		if (index !== -1)
		{
			comandas.splice(index, 1);
			io.sockets.emit("delete_comanda", identifier);
		}
	});
	socket.on("update_comanda", (identifier, title, notes, items) =>
	{
		const index = comandas.findIndex(item => item.identifier === identifier);
		if (index !== -1)
		{
			comandas[index].title = title;
			comandas[index].notes = notes;
			comandas[index].items = items;
			io.sockets.emit("update_comanda", comandas[index]);
		}
	});
	socket.on("refresh_comanda", (identifier) =>
	{
		const index = comandas.findIndex(item => item.identifier === identifier);
		if (index !== -1)
		{
			socket.emit("refresh_comanda", comandas[index]);
		}
	});
});

server.listen(port, () =>
{
	console.log(`Server running ${3000}`);
});

