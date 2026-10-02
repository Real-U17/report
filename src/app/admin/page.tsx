"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await fetch("/api/reports");
    const data = await res.json();
    if(Array.isArray(data)) setReports(data);
  };

  const updateStatus = async (id: string, status: string) => {
    // In a real app we would have a PATCH endpoint, for speed I'm mocking the UI update
    alert(`อัปเดตสถานะเป็น ${status} สำหรับรายการ ${id} (Demo)`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 className="text-gradient" style={{ marginBottom: '2rem' }}>ระบบจัดการสำหรับเจ้าหน้าที่</h1>
      
      <div className="card">
        <h2>รายการแจ้งเหตุน้ำท่วมจากประชาชน</h2>
        <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--card-border)', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>วันที่</th>
              <th style={{ padding: '1rem' }}>พื้นที่</th>
              <th style={{ padding: '1rem' }}>ความรุนแรง</th>
              <th style={{ padding: '1rem' }}>รายละเอียด</th>
              <th style={{ padding: '1rem' }}>สถานะ</th>
              <th style={{ padding: '1rem' }}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid var(--card-border)' }}>
                <td style={{ padding: '1rem' }}>{new Date(r.createdAt).toLocaleDateString()}</td>
                <td style={{ padding: '1rem' }}>อ.{r.district}, จ.{r.province}</td>
                <td style={{ padding: '1rem' }}><span style={{ color: r.severity >= 4 ? 'var(--danger)' : 'var(--warning)', fontWeight: 'bold' }}>ระดับ {r.severity}</span></td>
                <td style={{ padding: '1rem', maxWidth: '200px' }}>{r.description}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', background: r.status === 'PENDING' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)', color: r.status === 'PENDING' ? 'var(--warning)' : 'var(--success)', fontSize: '0.9rem' }}>
                    {r.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => updateStatus(r.id, "APPROVED")} style={{ padding: '0.5rem 1rem', background: 'var(--success)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>อนุมัติ</button>
                  <button onClick={() => updateStatus(r.id, "REJECTED")} style={{ padding: '0.5rem 1rem', background: 'var(--danger)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>ปฏิเสธ</button>
                </td>
              </tr>
            ))}
            {reports.length === 0 && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', opacity: 0.6 }}>ยังไม่มีรายงานแจ้งเหตุ</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
