"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Create custom icons based on severity
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-div-icon",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color};"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

const getSeverityColor = (severity: number) => {
  if (severity === 1) return "#38bdf8";
  if (severity === 2) return "#0ea5e9";
  if (severity === 3) return "#0284c7";
  if (severity === 4) return "#dc2626";
  return "#991b1b";
};

export default function FloodMap() {
  const [mounted, setMounted] = useState(false);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    fetch("/api/reports")
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setReports(data);
      })
      .catch(err => console.error("Failed to load reports", err));
  }, []);

  if (!mounted) return <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>กำลังโหลดแผนที่...</div>;

  const center: [number, number] = [13.7563, 100.5018]; // Bangkok

  return (
    <MapContainer 
      center={center} 
      zoom={6} 
      scrollWheelZoom={true} 
      style={{ height: "100%", width: "100%", zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {reports.map((report) => (
        <Marker 
          key={report.id} 
          position={[report.latitude, report.longitude]} 
          icon={createCustomIcon(getSeverityColor(report.severity))}
        >
          <Popup>
            <div style={{ fontFamily: 'var(--font-prompt), sans-serif' }}>
              <strong style={{ fontSize: '1.1rem', color: '#0f172a' }}>อ.{report.district}, จ.{report.province}</strong><br/>
              <span style={{ color: getSeverityColor(report.severity), fontWeight: 'bold' }}>ความรุนแรง: ระดับ {report.severity}</span><br/>
              <p style={{ margin: '0.5rem 0', color: '#475569' }}>{report.description || "ไม่มีรายละเอียดเพิ่มเติม"}</p>
              <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                สถานะ: {report.status === "PENDING" ? "รอการตรวจสอบ ⏳" : "ยืนยันแล้ว ✅"}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
      
    </MapContainer>
  );
}

