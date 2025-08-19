// ===== KONEKSI REAL-TIME DENGAN SOCKET.IO =====

// 1. Hubungkan klien ke server Socket.IO (gunakan domain yang sama)
const socket = io({
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('Terhubung ke server dengan ID:', socket.id);
    updateConnectionStatus('online', 'Terhubung ke server real-time');
});

// 2. Dengarkan event 'update_data' dari server
socket.on('update_data', (data) => {
    console.log('Pesan diterima dari server:', data.message);
    showToast('Data baru diterima, memperbarui tampilan...', 'info');
    fetchAndDisplayData(true); 
});

socket.on('disconnect', (reason) => {
    console.log('Koneksi ke server terputus:', reason);
    updateConnectionStatus('error', 'Koneksi real-time terputus');
    
    // Coba reconnect setelah 2 detik
    setTimeout(() => {
        socket.connect();
    }, 2000);
});

// ... (kode lainnya tetap sama) ...
