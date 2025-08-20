// File: /api/data.js

export default async function handler(request, response) {
  // Ambil kunci API & ID Sheet dari Environment Variables di Vercel
  const SHEET_ID = process.env.SHEET_ID;
  const API_KEY = process.env.API_KEY;
  const RANGE = 'Sheet1!A:O'; // Sesuaikan jika perlu

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const fetchResponse = await fetch(url);
    if (!fetchResponse.ok) {
      throw new Error(`Google Sheets API error! Status: ${fetchResponse.status}`);
    }
    const data = await fetchResponse.json();

    // Proses data: Hapus header dan balik urutan agar yang terbaru di atas
    const rows = data.values ? data.values.slice(1).reverse() : [];

    // Header CORS agar bisa diakses dari GitHub Pages
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Kirim data yang sudah diolah sebagai respons
    response.status(200).json({ values: rows });

  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Gagal mengambil data dari Google Sheets.' });
  }
}