const express = require("express");
const app = express();
const server = require("http").createServer(app); 
const io = require("socket.io")(server)

app.use(express.static("./public"));
app.set("views", "./public");
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", (req, res) => {
  res.render("index.html");
});

server.listen(8080, () => console.log("Listening on port 8080"));

io.on("connection", socket => {
  console.log(`Socket conectado, id = ${socket.id}`);
});

const PokerGame = require("./PokerGame.js");


const game = new PokerGame(4, 1000, 10);

game.addPlayer("nome1");
game.addPlayer("nome2");



app.get('/newgame',(req, res) => res.send(game.getPlayers()));
