
export default function Awards() {
  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      padding: '3rem',
      background: '#f1f5f9',
      minHeight: '100vh'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2.5rem',
          color: '#006BA6',
          marginBottom: '2rem'
        }}>🏆 Awards Panel</h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1.5rem'
        }}>
          {[1,2,3,4].map(n => (
            <div key={n} style={{
              backgroundColor: '#fff',
              borderRadius: '10px',
              padding: '1rem',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: '#E63946', fontSize: '1.2rem' }}>Award Title {n}</h3>
              <p>Description of the award content goes here.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
