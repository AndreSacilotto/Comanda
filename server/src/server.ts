import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const app = express();
app.use(cors());
const server = createServer(app);

const port = process.env.PORT || 3000;

const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
		credentials: true,
	},
});

io.on(
	"connection",
	(socket: Socket) => {
		socket.on("clientMsg", (data) => {
			console.log(data);
			if (data.room === "") {
				io.sockets.emit("serverMsg", data);
			} else {
				socket.join(data.room);
				io.to(data.room).emit("serverMsg", data);
			}
		});
	}
);

server.listen(port, () => {
	console.log(`Server running ${3000}`);
});


