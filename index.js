const express = require("express");
const app = express();
const server = require("http").createServer(app); 
const io = require("socket.io")(server);
const PORT = process.env.PORT || 8080;

app.use(express.static("./public"));
app.set("views", "./public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

server.listen(PORT, () => console.log("Server running"));

const PokerGame = require("./PokerGame.js");


const game = new PokerGame(4, 1000, 10);

io.on("connection", socket => {
  console.log(`Socket conectado, id = ${socket.id}`);
  game.addPlayer(socket.id, `Jogador-${socket.id}`);
  console.log(game.getState());
  socket.broadcast.emit("new-player", game.getPlayer(socket.id));
  socket.emit("initial-state", game.getState());

  socket.on("bet", data => {
    game.placeBet(socket.id, parseInt(data.value));
    io.emit("state-update", game.getState());
    console.log(game.getState());
  });

  socket.on("disconnect", () => {
    game.removePlayer(socket.id);
    console.log(game.getState());
    socket.broadcast.emit("remove-player", socket.id);
  });
});
