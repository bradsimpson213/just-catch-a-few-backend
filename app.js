//REQUIRED PACKAGES
const express = require ('express');
const morgan =  require('morgan');
const path = require('path');
const { createServer } = require('http');
const WebSocket = require('ws');
const db = require('./db/models');
const cors = require("cors");

const { port } = require('./config/index');
const usersRouter = require('./routes/users');
const pokemonRouter = require('./routes/pokemon')

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:3000" }));
//app.use(cors());
// app.use(cors( {origin} ));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/users", usersRouter);
app.use("/pokemon", pokemonRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const server = createServer(app);

// CREATE WEBSOCKET CONNECTION
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
  ws.on("message", (jsonData) => {
    console.log(`Processing incoming message ${jsonData}...`);

    const message = JSON.parse(jsonData);
    const chatMessage = message.data;

    const addChatMessage = {
      type: "add-chat-message",
      data: chatMessage,
    };
    const jsonAddChatMessage = JSON.stringify(addChatMessage);
    console.log(`Sending message ${jsonAddChatMessage}...`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonAddChatMessage);
      }
    });
  });

  ws.on("close", (e) => {
    console.log("Closing socket:", e);
  });
});

// TEST DATABASE CONNECTION AND THEN START UP SERVER
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    server.listen(port, () => console.log(`Listening on localhost:${port}`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });
