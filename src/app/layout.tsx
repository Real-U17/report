import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const promptFont = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "ระบบรายงานน้ำท่วมแห่งชาติ",
  description: "รายงานสถานการณ์น้ำท่วม แจ้งเหตุ และข้อมูลศูนย์พักพิงทั่วประเทศ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={promptFont.variable}>
      <body>
        <nav className="navbar">
          <div className="nav-brand">
            <span className="logo-icon">🌊</span>
            <span className="logo-text">ThaiFlood Monitor</span>
          </div>
          <div className="nav-links">
            <a href="/" className="nav-link active">หน้าแรก</a>
            <a href="/admin" className="nav-link">สำหรับเจ้าหน้าที่</a>
            <a href="/report" className="nav-link report-btn">แจ้งเหตุ</a>
          </div>
        </nav>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
