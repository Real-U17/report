"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportMapWrapper from "@/components/ReportMapWrapper";

import PROVINCE_DISTRICTS from "@/lib/province_districts.json";

const WATER_LEVELS = [
  { level: "1", label: "ระดับตาตุ่ม", desc: "มีน้ำขัง รอการระบาย", height: "15%", color: "#38bdf8" },
  { level: "2", label: "ระดับเข่า", desc: "รถเล็กผ่านลำบาก", height: "35%", color: "#0ea5e9" },
  { level: "3", label: "ระดับเอว", desc: "เข้าบ้านเรือนบางส่วน", height: "55%", color: "#0284c7" },
  { level: "4", label: "ระดับอก", desc: "ต้องใช้เรือสัญจร", height: "75%", color: "#dc2626" },
  { level: "5", label: "มิดหัว", desc: "วิกฤต ตัดขาดการสัญจร", height: "100%", color: "#991b1b" }
];

function PersonSVG() {
  return (
    <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <circle cx="50" cy="25" r="16" fill="#94a3b8" />
      <rect x="36" y="45" width="28" height="45" rx="10" fill="#94a3b8" />
      <rect x="20" y="50" width="12" height="40" rx="6" fill="#94a3b8" />
      <rect x="68" y="50" width="12" height="40" rx="6" fill="#94a3b8" />
      <rect x="36" y="85" width="11" height="50" rx="5" fill="#94a3b8" />
      <rect x="53" y="85" width="11" height="50" rx="5" fill="#94a3b8" />
    </svg>
  );
}

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
    <div style={{ maxWidth: '900px', margin: '3rem auto', background: '#ffffff', borderRadius: '1.5rem', boxShadow: '0 10px 30px rgba(2, 132, 199, 0.1)', padding: '2.5rem', borderTop: '6px solid #0ea5e9' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ color: '#0369a1', fontSize: '2.2rem', marginBottom: '0.5rem' }}>แบบฟอร์มแจ้งเหตุน้ำท่วม</h1>
        <p style={{ color: '#64748b' }}>ระบุตำแหน่งและรายละเอียดเพื่อให้หน่วยงานที่เกี่ยวข้องเข้าช่วยเหลือ</p>
      </div>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* Map Section */}
        <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>1. เลือกจุดที่เกิดเหตุ (คลิกบนแผนที่)</label>
          <ReportMapWrapper onLocationSelect={handleLocationSelect} initialLat={formData.latitude} initialLng={formData.longitude} />
        </div>

        {/* Location Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>จังหวัด</label>
            <select required name="province" value={formData.province} onChange={(e) => setFormData({...formData, province: e.target.value, district: ""})} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', cursor: 'pointer', transition: 'border 0.3s' }}>
              <option value="" disabled>-- เลือกจังหวัด --</option>
              {Object.keys(PROVINCE_DISTRICTS).sort().map(prov => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>อำเภอ/เขต</label>
            <select required name="district" value={formData.district} onChange={handleChange} disabled={!formData.province} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: formData.province ? '#ffffff' : '#f1f5f9', color: '#0f172a', outline: 'none', cursor: formData.province ? 'pointer' : 'not-allowed', transition: 'border 0.3s' }}>
              <option value="" disabled>-- เลือกอำเภอ/เขต --</option>
              {formData.province && (PROVINCE_DISTRICTS as any)[formData.province]?.map((dist: string) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Severity Visual Cards */}
        <div>
          <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600, color: '#0f172a', fontSize: '1.1rem' }}>ระดับน้ำ (คลิกเลือกที่รูปภาพ)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
            {WATER_LEVELS.map((level) => {
              const isSelected = formData.severity === level.level;
              return (
                <div 
                  key={level.level}
                  onClick={() => setFormData({ ...formData, severity: level.level })}
                  style={{
                    border: `2px solid ${isSelected ? level.color : '#e2e8f0'}`,
                    borderRadius: '1rem',
                    padding: '1rem 0.5rem',
                    cursor: 'pointer',
                    background: isSelected ? '#f0f9ff' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.2s',
                    transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: isSelected ? `0 4px 12px ${level.color}33` : 'none'
                  }}
                >
                  <div style={{ width: '60px', height: '100px', position: 'relative', overflow: 'hidden', marginBottom: '1rem' }}>
                    <PersonSVG />
                    {/* Water Overlay */}
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      width: '100%', 
                      height: level.height, 
                      background: level.color, 
                      opacity: 0.7,
                      transition: 'height 0.5s ease-in-out'
                    }}>
                      {/* Wave Effect */}
                      <div style={{
                        position: 'absolute',
                        top: '-5px',
                        left: 0,
                        width: '100%',
                        height: '10px',
                        background: `radial-gradient(circle at 5px 10px, transparent 5px, ${level.color} 6px)`,
                        backgroundSize: '10px 10px'
                      }}></div>
                    </div>
                  </div>
                  <strong style={{ color: isSelected ? level.color : '#334155', fontSize: '1.05rem', textAlign: 'center' }}>{level.label}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', textAlign: 'center', marginTop: '0.25rem' }}>{level.desc}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#334155' }}>รายละเอียดเพิ่มเติม (ไม่บังคับ)</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="อธิบายสถานการณ์เพิ่มเติม เช่น ต้องการความช่วยเหลือด้านใดเป็นพิเศษ" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid #cbd5e1', background: '#ffffff', color: '#0f172a', outline: 'none', resize: 'vertical' }}></textarea>
        </div>

        {/* Submit Button (Red) */}
        <button type="submit" disabled={loading} style={{ marginTop: '1rem', padding: '1.25rem', fontSize: '1.2rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white', borderRadius: '0.75rem', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', width: '100%', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)', transition: 'transform 0.2s' }} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
          {loading ? 'กำลังส่งข้อมูล...' : 'ส่งรายงานแจ้งเหตุด่วน 🚨'}
        </button>
      </form>
    </div>
  );
}


