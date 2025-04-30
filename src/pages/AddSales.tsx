import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  nama_produk: string;
  harga: number;
}

const AddSales: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [jumlah, setJumlah] = useState<number>(1);
  const navigate = useNavigate();

  const selectedProduct = products.find(p => p.id === selectedProductId);
  const totalHarga = selectedProduct ? selectedProduct.harga * jumlah : 0;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/product`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProductId || jumlah <= 0) return alert("Lengkapi data");

    const res = await fetch("/api/sales", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_produk: selectedProductId,
        jumlah,
      }),
    });

    if (res.ok) {
      alert("Transaksi berhasil disimpan!");
      navigate("/sales-report");
    } else {
      const err = await res.text();
      alert("Gagal menyimpan transaksi: " + err);
    }
  };

  return (
    <div className="p-6 max-w-md mt-8 mx-auto">
      <h1 className="text-2xl text-amber-600 font-bold mb-4">Input Transaksi Penjualan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={selectedProductId}
          onChange={e => setSelectedProductId(Number(e.target.value))}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">-- Pilih Produk --</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>
              {p.nama_produk} - Rp {p.harga}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={jumlah}
          min="1"
          onChange={e => setJumlah(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Jumlah"
          required
        />
        <p className="font-mono">Total Harga: <strong>Rp {totalHarga.toLocaleString()}</strong></p>
        <button
          type="submit"
          className="bg-green-600 hover:bg-fuchsia-400 font-mono text-white px-4 py-2 rounded"
        >
          Simpan Transaksi
        </button>
      </form>
    </div>
  );
};

export default AddSales;
