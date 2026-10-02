"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportMapWrapper from "@/components/ReportMapWrapper";

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

  const handleLocationSelect = (lat: string, lng: string) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  if (success) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', textAlign: 'center', padding: '3rem', background: '#ffffff', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '5rem', marginBottom: '1rem', color: '#10b981' }}>✅</div>
        <h2 style={{ color: '#0ea5e9', fontSize: '2rem' }}>ส่งรายงานเรียบร้อยแล้ว!</h2>
        <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '1.1rem' }}>
          ขอบคุณที่ร่วมแจ้งเหตุ ข้อมูลของคุณจะถูกแสดงผลบนแผนที่หลัก
        </p>
        <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#94a3b8' }}>กำลังกลับสู่หน้าหลัก...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '3rem auto', background: '#ffffff', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(2, 132, 199, 0.1)', padding: '2.5rem', borderTop: '6px solid #0ea5e9' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ color: '#0369a1', fontSize: '2.2rem', marginBottom: '0.5rem' }}>แบบฟอร์มแจ้งเหตุน้ำท่วม</h1>
        <p style={{ color: '#64748b' }}>ระบุตำแหน่งบนแผนที่และให้ข้อมูลเพื่อขอความช่วยเหลือหรือแจ้งเตือน</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Map Section */}
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>1. เลือกจุดที่เกิดเหตุ (คลิกบนแผนที่)</label>
          <ReportMapWrapper onLocationSelect={handleLocationSelect} initialLat={formData.latitude} initialLng={formData.longitude} />
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <input type="text" value={`ละติจูด: ${formData.latitude}`} readOnly style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#475569' }} />
            <input type="text" value={`ลองจิจูด: ${formData.longitude}`} readOnly style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#475569' }} />
          </div>
        </div>

        {/* Location Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>จังหวัด</label>
            <input required type="text" name="province" value={formData.province} onChange={handleChange} placeholder="เช่น เชียงราย" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', transition: 'border 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#0ea5e9'} onBlur={(e) => e.target.style.borderColor = '#cbd5e1'} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>อำเภอ/เขต</label>
            <input required type="text" name="district" value={formData.district} onChange={handleChange} placeholder="เช่น แม่สาย" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', transition: 'border 0.3s' }} onFocus={(e) => e.target.style.borderColor = '#0ea5e9'} onBlur={(e) => e.target.style.borderColor = '#cbd5e1'} />
          </div>
        </div>

        {/* Severity */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>ระดับความรุนแรง</label>
          <select required name="severity" value={formData.severity} onChange={handleChange} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', cursor: 'pointer' }}>
            <option value="1">ระดับ 1 - มีน้ำขังรอการระบาย</option>
            <option value="2">ระดับ 2 - น้ำท่วมผิวจราจร รถเล็กผ่านลำบาก</option>
            <option value="3">ระดับ 3 - น้ำเข้าบ้านเรือน ได้รับความเสียหายบางส่วน</option>
            <option value="4">ระดับ 4 - น้ำท่วมสูง ต้องใช้เรือในการสัญจร</option>
            <option value="5">ระดับ 5 - วิกฤต ตัดขาดการสัญจร ต้องการความช่วยเหลือด่วน</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>รายละเอียดเพิ่มเติม</label>
          <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} placeholder="อธิบายสถานการณ์ เช่น น้ำสูงประมาณ 50 ซม. หรือ ต้องการอาหารและน้ำดื่ม" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', resize: 'vertical' }}></textarea>
        </div>

        {/* Submit Button (Red) */}
        <button type="submit" disabled={loading} style={{ marginTop: '1rem', padding: '1.25rem', fontSize: '1.2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', borderRadius: '0.75rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          {loading ? 'กำลังส่งข้อมูล...' : 'ส่งรายงานแจ้งเหตุ 🚨'}
        </button>
      </form>
    </div>
  );
}

