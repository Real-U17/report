"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icon issues with Leaflet in React
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

  useEffect(() => {
    setMounted(true);
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
      
      {/* Sample Crisis Areas (Chiang Rai) */}
      <Circle center={[19.9105, 99.8406]} radius={15000} pathOptions={{ color: 'red', fillColor: '#fca5a5', fillOpacity: 0.5 }}>
        <Popup>
          <strong>จ.เชียงราย</strong><br/>
          ระดับน้ำ: วิกฤต<br/>
          ได้รับผลกระทบ: 5,000 ครัวเรือน
        </Popup>
      </Circle>

      {/* Sample Warning Areas (Ayutthaya) */}
      <Circle center={[14.3516, 100.5774]} radius={20000} pathOptions={{ color: 'orange', fillColor: '#fde047', fillOpacity: 0.5 }}>
        <Popup>
          <strong>จ.พระนครศรีอยุธยา</strong><br/>
          ระดับน้ำ: เฝ้าระวัง<br/>
          ปริมาณน้ำในแม่น้ำเจ้าพระยาเพิ่มสูง
        </Popup>
      </Circle>
      
      {/* Sample Shelter */}
      <Marker position={[14.3600, 100.5800]} icon={customIcon}>
        <Popup>
          <strong>ศูนย์พักพิง เทศบาลนครอยุธยา</strong><br/>
          รองรับได้: 200/500 คน
        </Popup>
      </Marker>
    </MapContainer>
  );
}
