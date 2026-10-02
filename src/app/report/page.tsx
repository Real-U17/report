"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ReportPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    province: "",
    district: "",
    severity: "1",
    description: "",
    latitude: "13.7563",
    longitude: "100.5018"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      } else {
        alert("เกิดข้อผิดพลาดในการส่งรายงาน");
      }
    } catch (error) {
      alert("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString()
        });
        alert("รับค่าพิกัดสำเร็จ");
      });
    } else {
      alert("เบราว์เซอร์ของคุณไม่รองรับการหาพิกัด GPS");
    }
  };

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '2rem' }} className="card">
        <div style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--success)' }}>✅</div>
        <h2>ส่งรายงานเรียบร้อยแล้ว!</h2>
        <p style={{ marginTop: '1rem', opacity: 0.8 }}>
          ขอบคุณที่ร่วมแจ้งเหตุ ข้อมูลของคุณจะถูกตรวจสอบโดยเจ้าหน้าที่และแสดงผลบนแผนที่
        </p>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.6 }}>กำลังกลับสู่หน้าหลัก...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }} className="card">
      <h1 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>แบบฟอร์มแจ้งเหตุน้ำท่วม</h1>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>จังหวัด</label>
            <input required type="text" name="province" value={formData.province} onChange={handleChange} placeholder="เช่น เชียงราย" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.5)' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>อำเภอ/เขต</label>
            <input required type="text" name="district" value={formData.district} onChange={handleChange} placeholder="เช่น แม่สาย" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.5)' }} />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>ระดับความรุนแรง</label>
          <select required name="severity" value={formData.severity} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.5)' }}>
            <option value="1">ระดับ 1 - มีน้ำขังรอการระบาย</option>
            <option value="2">ระดับ 2 - น้ำท่วมผิวจราจร รถเล็กผ่านลำบาก</option>
            <option value="3">ระดับ 3 - น้ำเข้าบ้านเรือน ได้รับความเสียหายบางส่วน</option>
            <option value="4">ระดับ 4 - น้ำท่วมสูง ต้องใช้เรือในการสัญจร</option>
            <option value="5">ระดับ 5 - วิกฤต ตัดขาดการสัญจร ต้องการความช่วยเหลือด่วน</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>รายละเอียดเพิ่มเติม</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="อธิบายสถานการณ์ เช่น น้ำสูงประมาณ 50 ซม. หรือ ต้องการอาหารและน้ำดื่ม" style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(255,255,255,0.5)' }}></textarea>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>พิกัด (ละติจูด, ลองจิจูด)</label>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="text" name="latitude" value={formData.latitude} readOnly style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.05)' }} />
            <input type="text" name="longitude" value={formData.longitude} readOnly style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', background: 'rgba(0,0,0,0.05)' }} />
            <button type="button" onClick={getLocation} style={{ padding: '0.75rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>📍 หาตำแหน่ง</button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="report-btn" style={{ marginTop: '1rem', padding: '1rem', fontSize: '1.1rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%' }}>
          {loading ? 'กำลังส่งข้อมูล...' : 'ส่งรายงานแจ้งเหตุ'}
        </button>
      </form>
    </div>
  );
}
