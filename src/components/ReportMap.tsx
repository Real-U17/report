"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function LocationMarker({ position, setPosition }: { position: [number, number], setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={customIcon}></Marker>
  );
}

function MapUpdater({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, map.getZoom(), { animate: true, duration: 1.5 });
  }, [position, map]);
  return null;
}

interface ReportMapProps {
  onLocationSelect: (lat: string, lng: string) => void;
  initialLat: string;
  initialLng: string;
}

export default function ReportMap({ onLocationSelect, initialLat, initialLng }: ReportMapProps) {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState<[number, number]>([Number(initialLat) || 13.7563, Number(initialLng) || 100.5018]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update position if props change externally
  useEffect(() => {
    const lat = Number(initialLat);
    const lng = Number(initialLng);
    if (!isNaN(lat) && !isNaN(lng) && (lat !== position[0] || lng !== position[1])) {
      setPosition([lat, lng]);
    }
  }, [initialLat, initialLng]);

  useEffect(() => {
    onLocationSelect(position[0].toString(), position[1].toString());
  }, [position]);

  if (!mounted) return <div style={{ height: "300px", width: "100%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem" }}>กำลังโหลดแผนที่...</div>;

  return (
    <div style={{ height: "300px", width: "100%", borderRadius: "0.5rem", overflow: "hidden", border: "2px solid var(--primary)", position: "relative", zIndex: 1 }}>
      <MapContainer 
        center={position} 
        zoom={6} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <MapUpdater position={position} />
      </MapContainer>
      <div style={{ position: "absolute", top: "10px", right: "10px", zIndex: 400, background: "rgba(255,255,255,0.9)", padding: "0.5rem 1rem", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)", fontSize: "0.9rem", color: "#1e293b", fontWeight: "bold" }}>
        👆 คลิกบนแผนที่เพื่อระบุพิกัด
      </div>
    </div>
  );
}
