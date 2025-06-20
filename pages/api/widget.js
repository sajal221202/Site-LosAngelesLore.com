// Next.js API route to serve widget.js
export default function handler(req, res) {
  // Set proper headers for JavaScript content
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
  
  // Widget JavaScript content
  const widgetScript = `// Raffle Widget JavaScript
// This file is served locally to prevent DNS errors

(function() {
  'use strict';
  
  // Widget configuration
  const WIDGET_CONFIG = {
    name: 'LosAngelesLore Raffle Widget',
    version: '1.0.0',
    timeout: 5000
  };

  // Widget state
  let widgetState = {
    loaded: false,
    error: false,
    entries: []
  };

  // Initialize widget
  function initWidget() {
    try {
      console.log(\`\${WIDGET_CONFIG.name} v\${WIDGET_CONFIG.version} initialized\`);
      widgetState.loaded = true;
      
      // Dispatch custom event for widget loaded
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('raffleWidgetLoaded', {
          detail: { config: WIDGET_CONFIG, state: widgetState }
        }));
      }
      
      return true;
    } catch (error) {
      console.error('Widget initialization failed:', error);
      widgetState.error = true;
      return false;
    }
  }

  // Handle raffle entry submission
  function submitEntry(entryData) {
    return new Promise((resolve, reject) => {
      try {
        // Validate entry data
        if (!entryData.name || !entryData.email) {
          reject(new Error('Missing required fields'));
          return;
        }

        // Simulate processing
        setTimeout(() => {
          const entry = {
            id: Date.now(),
            name: entryData.name,
            email: entryData.email,
            timestamp: new Date().toISOString(),
            status: 'submitted'
          };

          widgetState.entries.push(entry);
          
          console.log('Raffle entry submitted:', entry);
          resolve(entry);
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Get widget statistics
  function getStats() {
    return {
      totalEntries: widgetState.entries.length,
      loaded: widgetState.loaded,
      error: widgetState.error,
      config: WIDGET_CONFIG
    };
  }

  // Export widget API
  if (typeof window !== 'undefined') {
    window.RaffleWidget = {
      init: initWidget,
      submitEntry: submitEntry,
      getStats: getStats,
      config: WIDGET_CONFIG
    };
  }

  // Auto-initialize if DOM is ready
  if (typeof document !== 'undefined' && document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWidget);
  } else if (typeof document !== 'undefined') {
    initWidget();
  }

})();`;

  // Send the widget script
  res.status(200).send(widgetScript);
} 