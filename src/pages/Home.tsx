import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="bg-opacity-50 p-8 rounded-md">
        <h1 className="text-6xl animate-bounce font-bold text-cyan-600 mb-8 drop-shadow">
          Semangat Bekerja di Toko Roti Enak
        </h1>
        <p className="text-2xl font-mono text-black mb-8 drop-shadow">
          Silakan klik Kelola Produk di bawah jika ingin memanajemen produk.
        </p>
        <Link
          to="/products"
          className="bg-green-400 text-white font-bold px-6 py-3 rounded hover:bg-fuchsia-400"
        >
          Kelola Produk
        </Link>
      </div>
    </div>
  );
};

export default Home;
