// ===== KONEKSI REAL-TIME DENGAN SOCKET.IO =====

// 1. Hubungkan klien ke server Socket.IO
const socket = io();

socket.on('connect', () => {
    console.log('Terhubung ke server dengan ID:', socket.id);
    updateConnectionStatus('online', 'Terhubung ke server real-time');
});

// 2. INI BAGIAN KUNCI: Dengarkan event 'update_data' dari server
socket.on('update_data', (data) => {
    console.log('Pesan diterima dari server:', data.message);
    showToast('Data baru diterima, memperbarui tampilan...', 'info');

    // Panggil fungsi untuk mengambil dan menampilkan data terbaru
    // Kita bisa menggunakan kembali fungsi manualRefresh atau yang lebih sederhana
    fetchAndDisplayData(true); 
});

socket.on('disconnect', () => {
    console.log('Koneksi ke server terputus.');
    updateConnectionStatus('error', 'Koneksi real-time terputus');
});


// ===== FUNGSI-FUNGSI LAINNYA =====

// Buat fungsi baru yang ringkas untuk fetch dan display
async function fetchAndDisplayData(showSpinner = false) {
    if (showSpinner) {
        // Logika untuk menampilkan spinner bisa ditambahkan di sini
    }
    try {
        // fetchDataFromSheets() adalah fungsi yang sudah Anda miliki
        await fetchDataFromSheets(showSpinner);
    } catch (error) {
        console.error("Gagal memperbarui data setelah notifikasi:", error);
    } finally {
        // Logika untuk menyembunyikan spinner
    }
}

// Fungsi refresh manual sekarang hanya perlu memanggil fetchAndDisplayData
function manualRefresh() {
    console.log("Refresh manual dipicu.");
    showToast('Memperbarui data secara manual...', 'info');
    fetchAndDisplayData(true);
}

// ... (Sisa fungsi Anda yang lain seperti displayRecentAttendance, getStatusInfo, dll., tetap sama) ...


// ===== INISIALISASI APLIKASI =====

document.addEventListener('DOMContentLoaded', () => {
    // Hubungkan tombol refresh
    document.getElementById('refreshButton').addEventListener('click', manualRefresh);

    // Lakukan pengambilan data PERTAMA KALI saat halaman dibuka
    console.log("Memuat data awal...");
    fetchAndDisplayData(true);
});
