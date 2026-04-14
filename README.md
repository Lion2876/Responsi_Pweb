# Responsi_Pweb
# 🎮 Persona Finder x RPG Linktree

Sebuah aplikasi web interaktif bertema **RPG (Role-Playing Game)** Retro yang menggabungkan fitur pencarian persona digital dengan kartu profil (Linktree) kustom. Proyek ini menonjolkan estetika *pixel art* 8-bit, efek suara nostalgia, dan elemen visual interaktif.

## 🚀 Fitur Utama

- **Digital Persona Scanner**: Algoritma unik yang menentukan gelar persona pengguna (60+ variasi) berdasarkan Nama, Hobi, dan Angka Keberuntungan.
- **RPG Status Dashboard**: Visualisasi status bar (HP, MP, dan EXP) yang dinamis menggunakan CSS kustom.
- **Anime Companion**: Widget pendamping karakter (Raiden Ei - Electro Fighter) dengan bingkai pixelated.
- **Retro Audio Feedback**: Implementasi *Web Audio API* untuk menghasilkan suara klik dan hover bergaya 8-bit secara real-time.
- **Responsive Pixel UI**: Desain antarmuka yang dioptimalkan untuk berbagai ukuran layar dengan tetap menjaga ketajaman estetika pixel.

## 🛠️ Teknologi yang Digunakan

- **HTML5**: Struktur semantik untuk dashboard dan panel pencarian.
- **CSS3 (Pixel-Art Engine)**: Menggunakan teknik `box-shadow` berlapis, kustom variabel, dan animasi @keyframes untuk efek glow.
- **JavaScript (Vanilla)**: Logika generator persona dan pengolahan audio synthesizer tanpa library eksternal.
- **Google Fonts**: Menggunakan font *Press Start 2P* dan *VT323* untuk nuansa retro.
- **FontAwesome**: Ikonografi bertema petualangan dan media sosial.

## 📁 Struktur Proyek

```text
├── index.html   # Struktur utama dashboard dan profil
├── style.css    # Desain UI pixel art dan animasi
├── script.js    # Logika persona generator dan audio engine
├── pp.jpg       # Foto profil utama
└── ppp.jpg      # Foto karakter pendamping (Raiden Ei)
