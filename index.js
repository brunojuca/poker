const PokerGame = require("./PokerGame.js");

const express = require("express");

const app = express();

app.use(express.json());

app.listen(8080, () => console.log("Listening on port 8080"));

const game = new PokerGame(4, 1000, 10);

game.addPlayer("nome1");
game.addPlayer("nome2");

app.get('/',(req, res) => res.send(game.getPlayers()));
