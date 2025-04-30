import React, { useEffect, useState } from "react";
import axios from "../utils/AxiosInstance";

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState({
    totalProduk: 0,
    totalStok: 0,
    totalPenjualan: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProduk, resPenjualan] = await Promise.all([
          axios.get("/api/product"),
          axios.get("/api/sales/total"),
        ]);

        const totalStok = resProduk.data.reduce(
          (sum: number, p: any) => sum + p.stok,
          0
        );

        setSummary({
          totalProduk: resProduk.data.length,
          totalStok,
          totalPenjualan: resPenjualan.data.total || 0,
        });
      } catch (err) {
        console.error("Gagal memuat ringkasan dashboard", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 justify-items-center mt-24 space-y-6">
      <h1 className="text-4xl text-amber-600 font-bold">Dashboard Toko Roti</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="p-4 border border-b-cyan-500 font-mono rounded shadow">
          Total Produk: {summary.totalProduk}
        </div>
        <div className="p-4 border border-b-cyan-500 font-mono rounded shadow">
          Stok Tersedia: {summary.totalStok}
        </div>
        <div className="p-4 border border-b-cyan-500 font-mono rounded shadow">
          Total Penjualan: Rp {summary.totalPenjualan.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
