const { Server } = require("socket.io");

// Simpan instance Socket.IO secara global
let io;

// Inisialisasi Socket.IO
function initSocketIO(server) {
  if (!io) {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.on('connection', (socket) => {
      console.log('Seorang pengguna terhubung:', socket.id);
      
      socket.on('disconnect', () => {
        console.log('Pengguna terputus:', socket.id);
      });
    });
  }
  return io;
}

module.exports = async (req, res) => {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    console.log('Webhook diterima dari Google Sheets!');
    
    // Dapatkan instance Socket.IO
    const server = require('http').createServer();
    const ioInstance = initSocketIO(server);
    
    // Kirim update ke semua client
    ioInstance.emit('update_data', { 
      message: 'Ada data baru dari Google Sheets!',
      timestamp: new Date().toISOString()
    });

    res.status(200).send('Notifikasi diterima.');
  } else {
    res.status(405).send('Method not allowed');
  }
};