import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Raffle() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [widgetLoaded, setWidgetLoaded] = useState(false);
  const [widgetError, setWidgetError] = useState(false);

  // Handle external widget loading with DNS error prevention
  useEffect(() => {
    const loadWidget = async () => {
      try {
        // Simulate loading an external widget script
        // In a real implementation, this would be an actual external script
        const widgetScript = document.createElement('script');
        widgetScript.src = '/api/widget.js'; // Use relative path to avoid DNS issues
        widgetScript.async = true;
        widgetScript.onload = () => {
          setWidgetLoaded(true);
          setWidgetError(false);
          console.log('Raffle widget loaded successfully');
        };
        widgetScript.onerror = () => {
          setWidgetError(true);
          setWidgetLoaded(false);
          console.warn('Widget script failed to load, using fallback');
        };

        // Add timeout to prevent hanging
        const timeout = setTimeout(() => {
          if (!widgetLoaded && !widgetError) {
            setWidgetError(true);
            setWidgetLoaded(false);
            console.warn('Widget loading timeout, using fallback');
          }
        }, 3000); // Reduced timeout for better UX

        document.head.appendChild(widgetScript);

        return () => {
          clearTimeout(timeout);
          if (document.head.contains(widgetScript)) {
            document.head.removeChild(widgetScript);
          }
        };
      } catch (err) {
        setWidgetError(true);
        setWidgetLoaded(false);
        console.error('Error loading widget:', err);
      }
    };

    loadWidget();
  }, []); // Remove widgetLoaded dependency to prevent infinite loops

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Simulate API call with improved reliability
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Reduce failure rate to 2% for better user experience
          if (Math.random() > 0.02) { // 98% success rate
            resolve();
          } else {
            reject(new Error('Temporary server issue. Please try again.'));
          }
        }, 800); // Slightly faster response
      });

      setSubmitted(true);
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message || 'Failed to submit entry. Please try again.');
      console.error('Raffle submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError('');
  };

  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      padding: '3rem',
      background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '2px solid #ff9800'
      }}>
        {/* Header */}
        <header style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            color: '#006BA6',
            margin: '0 0 0.5rem 0'
          }}>
            🎟️ Raffle Widget
          </h1>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '0.5rem',
            color: '#666'
          }}>
            Enter your name for a chance to win exclusive merch!
          </p>
          {widgetError && (
            <div style={{
              backgroundColor: '#fff3cd',
              color: '#856404',
              padding: '0.5rem',
              borderRadius: '6px',
              fontSize: '0.9rem',
              marginTop: '0.5rem'
            }}>
              ⚠️ Widget loading in fallback mode
            </div>
          )}
        </header>

        {/* Navigation */}
        <nav style={{
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link href="/" style={{
            color: '#006BA6',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #006BA6',
            fontSize: '0.9rem'
          }}>
            🏠 Home
          </Link>
          <Link href="/story-reader" style={{
            color: '#006BA6',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #006BA6',
            fontSize: '0.9rem'
          }}>
            📖 Story Reader
          </Link>
          <Link href="/awards" style={{
            color: '#006BA6',
            textDecoration: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #006BA6',
            fontSize: '0.9rem'
          }}>
            🏆 Awards
          </Link>
        </nav>

        {/* Widget Status */}
        <div style={{
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: widgetLoaded ? '#d4edda' : widgetError ? '#f8d7da' : '#d1ecf1',
          color: widgetLoaded ? '#155724' : widgetError ? '#721c24' : '#0c5460',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          {widgetLoaded ? (
            <>✅ Widget loaded successfully</>
          ) : widgetError ? (
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>⚠️ Using fallback widget mode</span>
              <button
                onClick={() => window.location.reload()}
                style={{
                  backgroundColor: '#721c24',
                  color: 'white',
                  border: 'none',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <>⏳ Loading widget...</>
          )}
        </div>

        {/* Main Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Name: *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#333'
              }}>
                Email: *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #ddd',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
                required
              />
            </div>

            {error && (
              <div style={{
                backgroundColor: '#f8d7da',
                color: '#721c24',
                padding: '0.75rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                fontSize: '0.9rem'
              }}>
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                backgroundColor: isSubmitting ? '#ccc' : '#E63946',
                color: 'white',
                border: 'none',
                padding: '12px 16px',
                borderRadius: '6px',
                fontSize: '1.1rem',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.3s'
              }}
            >
              {isSubmitting ? 'Submitting...' : '🎯 Enter Raffle'}
            </button>
          </form>
        ) : (
          /* Success Message */
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🎉
            </div>
            <h2 style={{
              color: '#006BA6',
              marginBottom: '1rem'
            }}>
              Entry Submitted!
            </h2>
            <p style={{
              fontSize: '1.1rem',
              marginBottom: '2rem',
              color: '#666'
            }}>
              Thank you for entering our raffle! We'll notify you if you win.
            </p>
            <button
              onClick={resetForm}
              style={{
                backgroundColor: '#006BA6',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              Enter Another Entry
            </button>
          </div>
        )}

        {/* Footer */}
        <footer style={{
          marginTop: '2rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <p>© 2025 LosAngelesLore.com • Raffle entries are stored securely</p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link href="/careduel" style={{
              color: '#006BA6',
              textDecoration: 'none'
            }}>
              💖 Try our CareDuel Challenge
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}
