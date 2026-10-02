import Link from "next/link";
import styles from "./page.module.css";
import MapWrapper from "@/components/MapWrapper";

export default function Home() {
  return (
    <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <header className={styles.header} style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 700 }}>
          สถานการณ์น้ำท่วมล่าสุด
        </h1>
        <p style={{ opacity: 0.8, fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
          ติดตามสถานการณ์ เฝ้าระวัง และรายงานเหตุการณ์น้ำท่วมทั่วประเทศ 
          พร้อมข้อมูลช่วยเหลือฉุกเฉิน
        </p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontSize: '3rem', color: 'var(--danger)', background: 'rgba(239,68,68,0.1)', padding: '1rem', borderRadius: '1rem' }}>🚨</div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>พื้นที่วิกฤต (จังหวัด)</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--danger)' }}>12</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontSize: '3rem', color: 'var(--warning)', background: 'rgba(245,158,11,0.1)', padding: '1rem', borderRadius: '1rem' }}>⚠️</div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>เฝ้าระวัง (จังหวัด)</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--warning)' }}>5</div>
          </div>
        </div>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontSize: '3rem', color: 'var(--success)', background: 'rgba(16,185,129,0.1)', padding: '1rem', borderRadius: '1rem' }}>🏠</div>
          <div>
            <div style={{ opacity: 0.7, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>ศูนย์พักพิงที่เปิดรับ</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)' }}>48</div>
          </div>
        </div>
      </section>

      <section>
        <div className="card" style={{ padding: '0', overflow: 'hidden', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--card-bg)' }}>
          <MapWrapper />
        </div>
      </section>

      <section>
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.4))' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>พบเห็นเหตุการณ์น้ำท่วม?</h2>
          <p style={{ margin: '0 auto 2rem', opacity: 0.8, maxWidth: '500px', fontSize: '1.1rem' }}>
            ร่วมรายงานสถานการณ์ในพื้นที่ของคุณ เพื่อช่วยเหลือและแจ้งเตือนผู้อื่นให้ปลอดภัย
          </p>
          <Link href="/report" className="report-btn" style={{ fontSize: '1.2rem', padding: '1rem 3rem', display: 'inline-block' }}>
            แจ้งเหตุน้ำท่วมด่วน
          </Link>
        </div>
      </section>
    </div>
  );
}
