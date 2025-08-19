// File: app.js (di repositori webpresensi GitHub Anda)

// ===== VARIABEL GLOBAL =====
let allData = [];
// ... variabel lain yang Anda butuhkan ...

// ===== FUNGSI INTI =====

/**
 * Fungsi baru untuk mengambil data dari API Vercel kita.
 */
async function fetchDataFromServer() {
  // Ganti dengan URL Vercel Anda
  const apiUrl = 'https://presensi-i7ghoytzh-edisetiawans-projects.vercel.app/api/data';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Gagal mengambil data dari server, status: ${response.status}`);
    }
    const data = await response.json();
    
    // Data dari Vercel sudah diolah, kita tinggal menyimpannya
    allData = data.values.map(row => ({
        // Sesuaikan urutan indeks (row[0], row[1], dst.) dengan data Anda
        // karena data sudah di-reverse, urutannya mungkin perlu disesuaikan.
        // Contoh:
        date: row[3] || '',
        tanggal: row[1] || '',
        jam: row[4] || '',
        namaLengkap: row[6] || '',
        kelas: row[10] || '',
        keterangan: row[11] || '',
        mataPelajaran: row[13] || ''
        // ... lengkapi properti lainnya
    }));

    // Panggil fungsi untuk menampilkan data
    displayRecentAttendance();
    // Panggil fungsi lain jika perlu (updateStatistics, dll.)
    
    updateConnectionStatus(`Terakhir update: ${new Date().toLocaleTimeString('id-ID')}`);

  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    updateConnectionStatus("Gagal terhubung.");
  }
}

// ... (Salin semua fungsi helper Anda ke sini: displayRecentAttendance, getStatusInfo, getInitials, updateConnectionStatus, dll.) ...


// ===== INISIALISASI APLIKASI =====

document.addEventListener('DOMContentLoaded', () => {
    // Hubungkan tombol refresh jika ada
    const refreshButton = document.getElementById('refreshButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', fetchDataFromServer);
    }

    // 1. Lakukan pengambilan data pertama kali saat halaman dibuka
    console.log("Memuat data awal...");
    fetchDataFromServer();

    // 2. Atur auto-refresh setiap 10 detik
    console.log("Auto-refresh akan dimulai setiap 10 detik.");
    setInterval(fetchDataFromServer, 10000);
});
