import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

const Product: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchData = () => {
    axios.get("/api/product").then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      await axios.delete(`/api/product/${id}`);
      fetchData();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-amber-600">Manajemen Produk</h1>
        <Link
          to="/add-product"
          className="bg-blue-500 hover:bg-fuchsia-400 text-white px-4 py-2 rounded"
        >
          Tambah Produk
        </Link>
      </div>
      <table className="w-full border shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-400">
            <th className="border p-2">Nama</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Stok</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.nama_produk}</td>
              <td className="border p-2">Rp {p.harga}</td>
              <td className="border p-2">{p.stok}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => navigate(`/edit-product/${p.id}`)}
                  className="bg-yellow-400 px-3 py-1 hover:bg-fuchsia-400 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 px-3 py-1 hover:bg-fuchsia-400 text-white rounded"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Product;
