const { log } = require("console");
var express = require("express");
var router = express.Router();
var http = require("http");
var { Server } = require("socket.io");
var { isUserAuth } = require("../isUserAuth");

const socketServer = (app) => {
  const server = http.createServer(app);

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12; // Get hours in 12-hour format
    const minutes = now.getMinutes();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
  
    // Format the time as "hh:mm AM/PM"
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${ampm}`;
  
    return formattedTime;
  }

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // console.log(`user connected ${socket.id}`);

   

     // Emit an event to the connected client with the room ID
  

    // console.log(`User ${socket.id} joined room ${roomId}`);

    // Handle disconnect event
    // socket.on("disconnect", () => {
    //   // Leave the room when a user disconnects
    //   socket.leave(roomId);
    //   console.log(`User ${socket.id} left room ${roomId}`);
    //   console.log(`User disconnected: ${socket.id}`);
    // });

    socket.on("sendMessage", (message,phoneNumber) => {
      const currentTime = getCurrentTime();
  io.emit("recieveMessage", { sender: phoneNumber, message, time: currentTime });
    });

  });

  server.listen(3002, () => {
    console.log("server is running");
  });
};

module.exports = socketServer;
