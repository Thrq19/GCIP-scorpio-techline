# Green Campus Intelligence Platform (GCIP)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit_Website-2ea44f?style=for-the-badge&logo=vercel)](https://gcip-scorpio-techline.vercel.app/)

## 📌 Deskripsi Aplikasi
GCIP adalah **High-Fidelity Prototype** aplikasi web untuk manajemen keberlanjutan kampus (Smart Campus). Aplikasi ini mensimulasikan ekosistem digital yang menghubungkan partisipasi mahasiswa (User) dengan pemantauan manajemen (Admin) secara *real-time*.

Aplikasi ini dibangun menggunakan **React** (Single Component) dan berjalan sepenuhnya di sisi klien (Client-Side) tanpa backend, menggunakan `LocalStorage` untuk menyimpan data sesi.

---

## 👥 Fitur & Persona

Aplikasi ini memiliki dua tampilan utama berdasarkan peran pengguna:

### 1. Admin View (Sarah - Head of Sustainability)
Dashboard ini dirancang untuk pemantauan operasional kampus.
*   **Live Energy Monitor:** Grafik area (`Recharts`) yang bergerak setiap 2 detik, mensimulasikan beban listrik kampus secara *real-time*. Grafik ini memiliki logika khusus untuk bereaksi terhadap input dari User App.
*   **Building Status:** Widget status beban listrik per gedung (Normal/Warning/Critical).
*   **IoT Device Manager:** Tabel manajemen status sensor (Online/Offline, Baterai).
*   **Analytics:** Grafik batang perbandingan penggunaan energi Grid vs Solar Panel (Data Dummy Statis).
*   **AI Alerts:** Notifikasi cerdas mengenai anomali sistem.

### 2. User View (Dinda - Mahasiswa)
Aplikasi mobile-web untuk gamifikasi dan pelaporan.
*   **Daily Quests (Baru):** Sistem misi harian (misal: "Recycle 5kg") yang otomatis melacak progres (progress bar) saat user melakukan submit laporan.
*   **Waste Log:** Formulir pelaporan sampah dengan pilihan jenis dan estimasi poin otomatis.
*   **Energy Log:** Formulir pelaporan penggunaan ruang (Lampu/AC) dengan kalkulator kWh otomatis.
*   **My Energy Footprint:** Grafik batang personal yang mencatat riwayat penggunaan energi user selama seminggu terakhir.
*   **Leaderboard:** Papan peringkat kompetitif yang mengurutkan user berdasarkan poin.

---

## ⚙️ Cara Kerja Teknis & Logika Simulasi

Meskipun tanpa backend, aplikasi ini terasa "hidup" berkat beberapa mekanisme logika:

### 1. Integrasi User ke Admin (The "Bridge")
Fitur paling canggih di prototipe ini adalah koneksi antara input User dan grafik Admin.
*   **Cara Kerja:** Saat User mensubmit laporan Energi (misal: 12 kWh), data ini disimpan ke dalam antrian sementara di `LocalStorage`.
*   **Efek:** Grafik di dashboard Admin (yang me-refresh setiap 2 detik) akan memeriksa antrian ini. Jika ada data baru, grafik akan melonjak (spike) sesuai nilai kWh yang diinput user, mensimulasikan sensor yang mendeteksi beban listrik baru.

### 2. Gamifikasi & Penyimpanan Data
Menggunakan `LocalStorage` browser untuk menjaga data tetap ada meskipun di-refresh:
*   `gcip_leaderboard`: Menyimpan skor poin "Dinda" agar ranking bisa naik/turun.
*   `gcip_user_quests`: Menyimpan status penyelesaian misi harian.
*   `gcip_history`: Menyimpan daftar riwayat aktivitas (Log).

### 3. Penggunaan Data Dummy
Untuk mempercepat prototyping, beberapa bagian menggunakan data statis (Hardcoded):
*   **Device List:** Data sensor di tab "IoT Devices" adalah array tetap.
*   **Weather Data:** Angka kecepatan angin dan solar irradiance adalah statis.
*   **Reports File:** Daftar file PDF di tab "Reports" hanya visual (tidak bisa diunduh nyata).
*   **Leaderboard Awal:** Nama-nama pesaing (Budi, Andi, Siti) adalah data palsu.

---

## 🛠️ Tech Stack
*   **Core:** React 18 (Hooks: `useState`, `useEffect`).
*   **Styling:** Tailwind CSS (Enterprise Green Theme: Emerald & Slate).
*   **Visualization:** Recharts (Responsive Charts).
*   **Icons:** Lucide React.

## 🚀 Cara Menggunakan
1.  **Login:** Pilih peran (Sarah atau Dinda) di halaman awal.
2.  **Sebagai User:** Coba isi form "Waste Log" atau "Energy Log". Perhatikan poin bertambah dan Progress Bar pada "Daily Quests" bergerak.
3.  **Sebagai Admin:** Amati grafik "Energy Consumption" yang bergerak. Jika Anda baru saja input data di User mode, grafik akan menunjukkan lonjakan.
