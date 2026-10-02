"use client";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
  ssr: false,
  loading: () => <div style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>กำลังโหลดแผนที่...</div>
});

export default function MapWrapper() {
  return <Map />;
}
