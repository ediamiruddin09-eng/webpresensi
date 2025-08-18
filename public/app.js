// File: public/app.js

// ===== KONEKSI REAL-TIME DENGAN SOCKET.IO =====
const socket = io();

socket.on('connect', () => {
    console.log('Terhubung ke server real-time.');
    // Anda bisa update status koneksi di UI di sini
});

// Ini adalah bagian terpenting: Mendengarkan pesan dari server
socket.on('update_data', (data) => {
    console.log('Notifikasi data baru diterima dari server!');
    // Tampilkan notifikasi kecil ke pengguna (opsional)
    showToast('Memperbarui data secara otomatis...', 'info');

    // Panggil fungsi untuk mengambil data terbaru dan memperbarui tampilan
    fetchAndDisplayData(); 
});

socket.on('disconnect', () => {
    console.error('Koneksi ke server real-time terputus.');
    // Anda bisa update status koneksi di UI di sini
});


// ===== FUNGSI UTAMA =====

// Fungsi untuk mengambil data dan menampilkan (Anda sudah punya ini)
async function fetchAndDisplayData() {
    try {
        // Fungsi `fetchDataFromSheets` Anda tetap sama
        await fetchDataFromSheets();
    } catch (error) {
        console.error("Gagal memperbarui data:", error);
    }
}

// Fungsi refresh manual sekarang lebih sederhana
function manualRefresh() {
    console.log("Refresh manual dipicu.");
    showToast('Memuat ulang data...', 'info');
    fetchAndDisplayData();
}

// ... (Semua fungsi helper Anda yang lain seperti displayRecentAttendance, getStatusInfo, dll., tetap di sini) ...


// ===== INISIALISASI APLIKASI =====
document.addEventListener('DOMContentLoaded', () => {
    // Hubungkan tombol refresh manual
    document.getElementById('refreshButton').addEventListener('click', manualRefresh);

    // Lakukan pengambilan data pertama kali saat halaman dibuka
    console.log("Memuat data awal...");
    fetchAndDisplayData();
});
