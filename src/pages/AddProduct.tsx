import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

const AddProduct: React.FC = () => {
  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    stok: ""
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("/api/product", {
        nama_produk: form.nama_produk,
        harga: Number(form.harga),
        stok: Number(form.stok)
      });

      console.log("✅ PRODUK DITAMBAHKAN");
      navigate("/products");
    } catch (err: any) {
      console.error("❌ ERROR FRONTEND:", err.message);
      setError("Gagal menambahkan produk");
    }
  };

  return (
    <div className="p-6 max-w-md mt-8 mx-auto">
      <h1 className="text-3xl text-center text-amber-600 font-bold mb-4">Tambah Produk</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nama Produk"
          value={form.nama_produk}
          onChange={e => setForm({ ...form, nama_produk: e.target.value })}
          className="w-full p-2 font-mono border rounded"
          required
        />
        <input
          type="number"
          placeholder="Harga"
          value={form.harga}
          onChange={e => setForm({ ...form, harga: e.target.value })}
          className="w-full p-2 border rounded"
          required
          min="0"
        />
        <input
          type="number"
          placeholder="Stok"
          value={form.stok}
          onChange={e => setForm({ ...form, stok: e.target.value })}
          className="w-full p-2 border rounded"
          required
          min="0"
        />
        <button
          type="submit"
          className="bg-green-500 font-mono hover:bg-fuchsia-400 text-white px-4 py-2 rounded"
        >
          Simpan
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
