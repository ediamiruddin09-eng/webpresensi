// File: app.js (di repositori GitHub Pages)

// ===== KONEKSI REAL-TIME DENGAN PUSHER =====

// PENTING: Ganti dengan KEY dan CLUSTER Anda dari dashboard Pusher
const PUSHER_KEY = 'c9c4e0d362f7d84fc510';
const PUSHER_CLUSTER = 'ap1';

// 1. Inisialisasi Pusher
const pusher = new Pusher(PUSHER_KEY, {
  cluster: PUSHER_CLUSTER
});

// 2. Subscribe ke channel yang sama dengan yang di server
const channel = pusher.subscribe('presensi-channel');

// 3. Dengarkan event 'data-updated'
channel.bind('data-updated', function(data) {
  console.log('Pesan diterima dari Pusher:', data.message);
  showToast('Data baru diterima, memperbarui tampilan...', 'info');

  // Panggil fungsi untuk mengambil data terbaru dan memperbarui tampilan
  fetchAndDisplayData(false); 
});


// ... (sisa kode Anda seperti fetchDataFromSheets, displayRecentAttendance, dll. tetap sama) ...
