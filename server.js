const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Middleware untuk menyajikan file statis (HTML, CSS, JS klien)
// Asumsikan file front-end Anda ada di dalam folder 'public'
app.use(express.static('public'));

// Endpoint untuk Webhook dari Google Apps Script
// Inilah "pintu" yang akan diketuk oleh Google
app.post('/webhook/sheet-update', (req, res) => {
    console.log('Webhook diterima dari Google Sheets!');

    // Meneruskan pesan "update_data" ke SEMUA klien yang terhubung
    io.emit('update_data', { message: 'Ada data baru, silakan refresh!' });

    // Mengirim respons kembali ke Google Apps Script
    res.status(200).send('Notifikasi diterima.');
});

// Menangani koneksi WebSocket dari klien
io.on('connection', (socket) => {
    console.log('Seorang pengguna terhubung:', socket.id);

    socket.on('disconnect', () => {
        console.log('Pengguna terputus:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
