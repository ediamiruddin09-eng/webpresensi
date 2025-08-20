// File: /api/webhook.js

const Pusher = require('pusher');

// Inisialisasi Pusher dengan kredensial Anda dari Environment Variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true
});

export default async function handler(request, response) {
  if (request.method === 'POST') {
    console.log('Webhook diterima! Memicu event ke Pusher...');

    // Memicu event bernama 'data-updated' di channel 'presensi-channel'
    await pusher.trigger('presensi-channel', 'data-updated', {
      message: "Ada data presensi baru!"
    });

    response.status(200).send('Webhook diterima dan event Pusher dipicu.');
  } else {
    response.status(405).send('Method Not Allowed');
  }
}
