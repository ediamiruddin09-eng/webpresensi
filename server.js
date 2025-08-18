// File: server.js

const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Sajikan file HTML & JS dari folder 'public'
app.use(express.static('public'));

// Endpoint Webhook untuk menerima sinyal dari Google Apps Script
app.post('/webhook/sheet-update', (req, res) => {
    console.log('Webhook diterima dari Google Sheets! Memberi tahu semua klien...');

    // Meneruskan pesan 'update_data' ke semua klien yang terhubung via WebSocket
    io.emit('update_data', { message: 'Ada data baru!' });

    res.status(200).send('Notifikasi diterima.');
});

// Menangani koneksi dari browser
io.on('connection', (socket) => {
    console.log('Pengguna terhubung:', socket.id);
    socket.on('disconnect', () => {
        console.log('Pengguna terputus:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server aktif dan berjalan di http://localhost:${PORT}`);
});
