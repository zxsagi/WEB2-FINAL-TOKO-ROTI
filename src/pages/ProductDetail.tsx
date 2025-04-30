import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Detail Produk</h1>
      <p>ID Produk: {id}</p>
      <p>Nama Produk: (Data produk berdasarkan ID akan tampil di sini)</p>
      <p>Harga: (Harga produk)</p>
      <p>Deskripsi: (Deskripsi roti)</p>

      <button className="mt-6 bg-green-500 text-white px-4 py-2 rounded">
        Tambahkan ke Keranjang
      </button>
    </div>
  );
};

export default ProductDetail;
