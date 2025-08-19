const { Server } = require("socket.io");

module.exports = async (req, res) => {
  // Socket.IO akan menangani upgrade request sendiri
  // Kita hanya perlu mengembalikan response kosong
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send('Socket.IO server');
};