'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [tenders, setTenders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Mengambil data dari Google Sheets
    const SHEET_ID = '1wu3x2gtbQxampjQL8Pv6E_UCdUVZpBqft8Un_-pv4KE';
    fetch(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`)
      .then(res => res.text())
      .then(text => {
        const json = JSON.parse(text.substring(47, text.length - 2));
        const rows = json.table.rows.map(row => ({
          id: row.c[0]?.v,
          judul: row.c[1]?.v,
          instansi: row.c[2]?.v,
          kategori: row.c[3]?.v,
          jenis: row.c[4]?.v,
          hps: row.c[5]?.v,
          deadline: row.c[6]?.v,
          link: row.c[7]?.v,
        }));
        setTenders(rows);
      });
  }, []);

  const filtered = filter === 'all' ? tenders : tenders.filter(t => t.kategori === filter);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-black mb-6">Radar Tender Indonesia</h1>
      <select onChange={(e) => setFilter(e.target.value)} className="mb-4 p-2 border rounded">
        <option value="all">Semua Kategori</option>
        <option value="pemerintah">Pemerintah</option>
        <option value="bumn">BUMN</option>
      </select>
      <div className="bg-white rounded-xl shadow p-6">
        <table className="w-full text-left">
          <tbody>
            {filtered.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="p-3 font-bold">{item.judul}</td>
                <td className="p-3">{item.kategori}</td>
                <td className="p-3"><a href={item.link} className="text-blue-600">Detail</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}