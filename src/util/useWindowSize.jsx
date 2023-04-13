import { useState, useEffect } from 'react';

// Hook
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: Math.max(window.innerWidth, 1700),
        height: Math.min(window.innerHeight),
      });
    }
    // Call handler
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
