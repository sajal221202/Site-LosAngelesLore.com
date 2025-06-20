
export default function Submit() {
  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      padding: '3rem',
      background: '#f9f9f9',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: '2rem'
      }}>
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '2rem',
          color: '#006BA6',
          marginBottom: '1rem'
        }}>📤 Submit Your Story</h1>
        <form>
          <label>Name:<br/><input type="text" style={{ width: '100%', padding: '8px' }} /></label><br/><br/>
          <label>Story:<br/><textarea rows="5" style={{ width: '100%', padding: '8px' }}></textarea></label><br/><br/>
          <button type="submit" style={{
            backgroundColor: '#006BA6',
            color: '#fff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Submit</button>
        </form>
      </div>
    </div>
  );
}
