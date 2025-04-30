import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama_produk: "",
    harga: "",
    stok: "",
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/product/${id}`)
      .then((res) => res.json())
      .then((data) =>
        setForm({
          nama_produk: data.nama_produk,
          harga: data.harga,
          stok: data.stok,
        })
      )
      .catch(() => setError("Gagal memuat data produk."));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/product/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama_produk: form.nama_produk,
          harga: Number(form.harga),
          stok: Number(form.stok),
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Gagal memperbarui produk");
      }

      

      navigate("/products");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.nama_produk}
          onChange={(e) =>
            setForm({ ...form, nama_produk: e.target.value })
          }
          className="w-full p-2 border rounded"
          placeholder="Nama Produk"
          required
        />
        <input
          type="number"
          value={form.harga}
          onChange={(e) => setForm({ ...form, harga: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Harga"
          required
        />
        <input
          type="number"
          value={form.stok}
          onChange={(e) => setForm({ ...form, stok: e.target.value })}
          className="w-full p-2 border rounded"
          placeholder="Stok"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
