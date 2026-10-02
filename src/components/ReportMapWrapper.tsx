"use client";
import dynamic from "next/dynamic";

const ReportMap = dynamic(() => import("./ReportMap"), {
  ssr: false,
  loading: () => <div style={{ height: "300px", width: "100%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "0.5rem" }}>กำลังโหลดแผนที่...</div>
});

export default function ReportMapWrapper(props: any) {
  return <ReportMap {...props} />;
}
