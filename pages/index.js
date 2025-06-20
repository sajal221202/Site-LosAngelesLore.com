import Link from 'next/link';

export default function Home() {
  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      padding: '3rem',
      background: 'linear-gradient(to right, #e0f7fa, #ffffff)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <header style={{ borderBottom: '2px solid #006BA6', marginBottom: '2rem' }}>
          <h1 style={{
            color: '#006BA6',
            fontFamily: 'Playfair Display, serif',
            fontSize: '3rem',
            marginBottom: '0.5rem'
          }}>
            Los Angeles Lore
          </h1>
          <p style={{ color: '#E63946', fontSize: '1.1rem' }}>
            Discover hidden stories, poems, and street art from LA.
          </p>
        </header>

        <main>
          <h2 style={{ fontFamily: 'Playfair Display', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
            📍 Explore the Site:
          </h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '1.2rem', lineHeight: '2rem' }}>
            <li><Link href="/story-reader" style={{ color: '#006BA6' }}>📖 Story Reader</Link></li>
            <li><Link href="/submit" style={{ color: '#006BA6' }}>📤 Submit Your Story</Link></li>
            <li><Link href="/awards" style={{ color: '#006BA6' }}>🏆 Awards Panel</Link></li>
            <li><Link href="/raffle" style={{ color: '#006BA6' }}>🎟️ Raffle Widget</Link></li>
            <li><Link href="/careduel" style={{ color: '#006BA6' }}>💖 CareDuel Banner</Link></li>
          </ul>
        </main>

        <footer style={{ marginTop: '3rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <p style={{ color: '#999' }}>© 2025 LosAngelesLore.com</p>
        </footer>
      </div>
    </div>
  );
}
