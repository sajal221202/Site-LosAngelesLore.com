import { useState, useEffect } from 'react';
import Link from 'next/link';

// Sample story data - in a real app this would come from an API
const sampleStories = [
  {
    id: 1,
    title: "The Hidden Mural of Echo Park",
    author: "Maria Rodriguez",
    content: "Walking down Sunset Boulevard one evening, I discovered a mural that seemed to appear only at dusk. The colors shifted with the fading light, telling stories of the neighborhood's history. Local artists had been adding to it for years, each layer representing a different era of Echo Park's transformation. The mural became a living history book, with new sections appearing overnight, each telling tales of the community's resilience and creativity.",
    date: "2024-01-15",
    location: "Echo Park"
  },
  {
    id: 2,
    title: "Midnight Tacos and Dreams",
    author: "Carlos Mendez",
    content: "At 2 AM, the taco truck on the corner of 5th and Main becomes more than just a place to eat. It's where dreams are shared over carne asada and horchata. The owner, Señor Luis, has been serving the community for 25 years, and his truck has witnessed countless late-night conversations about hopes, fears, and the American dream. Every customer leaves with a full stomach and a renewed sense of purpose.",
    date: "2024-01-20",
    location: "Downtown LA"
  },
  {
    id: 3,
    title: "The Library Ghost",
    author: "Sarah Chen",
    content: "The Central Library's reading room has a mysterious visitor - a ghost who appears to help students find exactly the book they need. Librarians have reported seeing an elderly woman in 1920s clothing walking between the stacks, and students claim to have been guided to perfect study spots by an unseen hand. The ghost, they say, is the spirit of the library's first head librarian, still dedicated to helping readers find knowledge.",
    date: "2024-01-25",
    location: "Central Library"
  },
  {
    id: 4,
    title: "Venice Beach Poetry",
    author: "James Wilson",
    content: "Every Sunday at sunset, poets gather on the Venice Beach boardwalk to share their work. The audience changes with the seasons - tourists in summer, locals in winter, but the poetry remains constant. Some recite from memory, others read from weathered notebooks, and a few create impromptu verses inspired by the ocean's rhythm. It's LA's longest-running open mic, a testament to the city's creative spirit.",
    date: "2024-02-01",
    location: "Venice Beach"
  },
  {
    id: 5,
    title: "The Highland Park Time Capsule",
    author: "Ana Martinez",
    content: "During renovations of an old Highland Park home, workers discovered a time capsule from 1950. Inside were letters from residents describing their hopes for the future, photographs of the neighborhood, and a list of local businesses that no longer exist. The current homeowners decided to add their own contributions and rebury the capsule, creating a bridge between past and present generations.",
    date: "2024-02-05",
    location: "Highland Park"
  },
  {
    id: 6,
    title: "Silver Lake's Secret Garden",
    author: "David Kim",
    content: "Hidden behind an unassuming gate in Silver Lake lies a community garden that's been tended by the same families for three generations. The garden grows more than vegetables - it grows community. Neighbors share gardening tips, children learn about sustainability, and everyone shares in the harvest. The garden has survived urban development, drought, and changing demographics, remaining a constant source of connection and growth.",
    date: "2024-02-10",
    location: "Silver Lake"
  }
];

export default function StoryReader() {
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate pagination
  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = sampleStories.slice(indexOfFirstStory, indexOfLastStory);
  const totalPages = Math.ceil(sampleStories.length / storiesPerPage);

  // Pagination functions
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  return (
    <div style={{
      fontFamily: 'Lora, sans-serif',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: isMobile ? '1rem' : '2rem'
    }}>
      {/* Header - Fixed for mobile, responsive design */}
      <header style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: isMobile ? '1rem' : '2rem',
        marginBottom: '2rem',
        position: isMobile ? 'sticky' : 'static',
        top: isMobile ? '0' : 'auto',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '1rem' : '0'
        }}>
          <div>
            <h1 style={{
              color: '#006BA6',
              fontFamily: 'Playfair Display, serif',
              fontSize: isMobile ? '1.8rem' : '2.5rem',
              margin: '0 0 0.5rem 0'
            }}>
              📖 Story Reader
            </h1>
            <p style={{ 
              color: '#E63946', 
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              margin: 0
            }}>
              Discover LA's hidden stories and local lore
            </p>
          </div>
          
          {/* Navigation Links - Responsive design */}
          <nav style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.5rem' : '1.5rem',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}>
            <Link href="/" style={{ 
              color: '#006BA6', 
              textDecoration: 'none',
              fontSize: isMobile ? '0.9rem' : '1rem',
              padding: isMobile ? '0.5rem 0' : '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s',
              ':hover': { backgroundColor: '#f0f8ff' }
            }}>
              🏠 Home
            </Link>
            <Link href="/submit" style={{ 
              color: '#006BA6', 
              textDecoration: 'none',
              fontSize: isMobile ? '0.9rem' : '1rem',
              padding: isMobile ? '0.5rem 0' : '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s'
            }}>
              📤 Submit Story
            </Link>
            <Link href="/awards" style={{ 
              color: '#006BA6', 
              textDecoration: 'none',
              fontSize: isMobile ? '0.9rem' : '1rem',
              padding: isMobile ? '0.5rem 0' : '0.5rem 1rem',
              borderRadius: '6px',
              transition: 'background-color 0.3s'
            }}>
              🏆 Awards
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Stories Display */}
        <div style={{
          display: 'grid',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {currentStories.map((story) => (
            <article key={story.id} style={{
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: isMobile ? '1.5rem' : '2rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #006BA6'
            }}>
              <header style={{ marginBottom: '1rem' }}>
                <h2 style={{
                  color: '#006BA6',
                  fontFamily: 'Playfair Display, serif',
                  fontSize: isMobile ? '1.4rem' : '1.8rem',
                  margin: '0 0 0.5rem 0'
                }}>
                  {story.title}
                </h2>
                <div style={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: isMobile ? '0.5rem' : '1rem',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  color: '#666'
                }}>
                  <span>👤 By {story.author}</span>
                  <span>📍 {story.location}</span>
                  <span>📅 {new Date(story.date).toLocaleDateString()}</span>
                </div>
              </header>
              
              <div style={{
                lineHeight: '1.8',
                fontSize: isMobile ? '1rem' : '1.1rem',
                color: '#333'
              }}>
                {story.content}
              </div>
            </article>
          ))}
        </div>

        {/* Pagination - Enhanced with mobile responsiveness */}
        {totalPages > 1 && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? '0.5rem' : '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              style={{
                padding: isMobile ? '0.5rem 0.8rem' : '0.75rem 1rem',
                border: '1px solid #006BA6',
                backgroundColor: currentPage === 1 ? '#f0f0f0' : '#ffffff',
                color: currentPage === 1 ? '#999' : '#006BA6',
                borderRadius: '6px',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              ← Previous
            </button>

            {/* Page Numbers */}
            {getPageNumbers().map((pageNumber, index) => (
              <button
                key={index}
                onClick={() => typeof pageNumber === 'number' && goToPage(pageNumber)}
                disabled={pageNumber === '...'}
                style={{
                  padding: isMobile ? '0.5rem 0.8rem' : '0.75rem 1rem',
                  border: '1px solid #006BA6',
                  backgroundColor: pageNumber === currentPage ? '#006BA6' : '#ffffff',
                  color: pageNumber === currentPage ? '#ffffff' : '#006BA6',
                  borderRadius: '6px',
                  cursor: pageNumber === '...' ? 'default' : 'pointer',
                  fontSize: isMobile ? '0.8rem' : '0.9rem',
                  minWidth: isMobile ? '2rem' : '2.5rem',
                  transition: 'all 0.3s'
                }}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: isMobile ? '0.5rem 0.8rem' : '0.75rem 1rem',
                border: '1px solid #006BA6',
                backgroundColor: currentPage === totalPages ? '#f0f0f0' : '#ffffff',
                color: currentPage === totalPages ? '#999' : '#006BA6',
                borderRadius: '6px',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontSize: isMobile ? '0.8rem' : '0.9rem',
                transition: 'all 0.3s'
              }}
            >
              Next →
            </button>
          </div>
        )}

        {/* Page Info */}
        <div style={{
          textAlign: 'center',
          color: '#666',
          fontSize: isMobile ? '0.8rem' : '0.9rem',
          marginBottom: '2rem'
        }}>
          Page {currentPage} of {totalPages} • Showing {indexOfFirstStory + 1}-{Math.min(indexOfLastStory, sampleStories.length)} of {sampleStories.length} stories
        </div>
      </main>

      {/* Footer - Fixed for mobile, responsive design */}
      <footer style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        padding: isMobile ? '1rem' : '2rem',
        marginTop: '3rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: isMobile ? '1rem' : '0'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.5rem' : '2rem',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}>
            <span style={{ 
              color: '#999',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              © 2025 LosAngelesLore.com
            </span>
            <Link href="/raffle" style={{ 
              color: '#006BA6', 
              textDecoration: 'none',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              🎟️ Enter Raffle
            </Link>
            <Link href="/careduel" style={{ 
              color: '#006BA6', 
              textDecoration: 'none',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              💖 CareDuel Challenge
            </Link>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '0.5rem' : '1rem',
            alignItems: isMobile ? 'flex-start' : 'center'
          }}>
            <span style={{ 
              color: '#666',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              📖 Reading {currentStories.length} stories
            </span>
            <span style={{ 
              color: '#666',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              📍 {sampleStories.length} total stories
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
} 