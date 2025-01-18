import React, { useState, useEffect } from 'react';

// Komponen ini menerima 'prefix' sebagai props dan mengembalikan randomCode
const RandomCodeInput = ({ prefix, setRandomCode }) => {
  // Fungsi untuk menghasilkan 6 karakter acak
  const generateRandomString = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';
    for (let i = 0; i < 6; i++) {  // 6 karakter acak
      randomPart += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomPart;
  };

  // Menggunakan useEffect untuk memicu pembuatan kode saat prefix berubah
  useEffect(() => {
    if (prefix.length === 2) {  // Pastikan prefix sudah berisi 2 karakter
      const randomString = generateRandomString();
      setRandomCode(prefix + randomString);  // Gabungkan prefix dengan string acak
    } else {
      setRandomCode('');  // Reset jika prefix kurang dari 2 karakter
    }
  }, [prefix, setRandomCode]);  // Efek ini dipicu setiap kali prefix berubah

  return null;  // Komponen ini hanya mengubah state di komponen induk
};

export default RandomCodeInput;
