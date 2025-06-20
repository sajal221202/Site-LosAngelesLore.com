
export default function Raffle() {
  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      padding: '3rem',
      background: '#fff3e0',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          color: '#006BA6'
        }}>🎟️ Raffle Widget</h1>
        <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Enter your name for a chance to win exclusive merch!
        </p>
        <input placeholder="Your name..." style={{ padding: '10px', width: '80%', borderRadius: '6px' }} />
        <br/><br/>
        <button style={{
          backgroundColor: '#E63946',
          color: 'white',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '6px'
        }}>Enter Raffle</button>
      </div>
    </div>
  );
}
