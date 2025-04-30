import React, { useEffect, useState } from "react";

interface Sale {
  tanggal: string;
  jumlah: number;
  total_harga: number;
  produk: {
    nama_produk: string;
  };
}

const SalesReport: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    fetch("/api/sales")
      .then(res => res.json())
      .then(data => setSales(data));
  }, []);

  return (
    <div className="p-6 justify-items-center mt-24">
      <h1 className="text-4xl text-amber-600 font-bold mb-6">Laporan Penjualan</h1>
      <table className="w-full border border-gray-300 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="border font-mono p-2">Tanggal</th>
            <th className="border font-mono p-2">Produk</th>
            <th className="border font-mono p-2">Jumlah</th>
            <th className="border font-mono p-2">Total Harga</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{new Date(sale.tanggal).toLocaleDateString()}</td>
              <td className="border p-2">{sale.produk.nama_produk}</td>
              <td className="border p-2">{sale.jumlah}</td>
              <td className="border p-2">Rp {sale.total_harga.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReport;