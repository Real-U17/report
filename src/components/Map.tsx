"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
      scrollWheelZoom={false} 
      style={{ height: "100%", width: "100%", zIndex: 1 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {reports.map((report) => (
        <Circle 
          key={report.id} 
          center={[report.latitude, report.longitude]} 
          radius={10000 + (report.severity * 2000)} 
          pathOptions={{ 
            color: report.severity >= 4 ? 'red' : 'orange', 
            fillColor: report.severity >= 4 ? '#fca5a5' : '#fde047', 
            fillOpacity: 0.5 
          }}
        >
          <Popup>
            <strong>อ.{report.district}, จ.{report.province}</strong><br/>
            ความรุนแรง: ระดับ {report.severity}<br/>
            รายละเอียด: {report.description}<br/>
            สถานะ: {report.status === "PENDING" ? "รอการตรวจสอบ" : "ยืนยันแล้ว"}
          </Popup>
        </Circle>
      ))}
      
    </MapContainer>
  );
}

