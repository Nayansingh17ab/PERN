import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function ActivityTracker() {
  const { isAuthenticated, updateActivity, checkSessionExpiry } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) return;

    // Activity events to track
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Update activity on user interaction
    const handleActivity = () => {
      updateActivity();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Check session expiry every 5 minutes
    const expiryCheckInterval = setInterval(() => {
      checkSessionExpiry();
    }, 5 * 60 * 1000); // Check every 5 minutes

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
      clearInterval(expiryCheckInterval);
    };
  }, [isAuthenticated, updateActivity, checkSessionExpiry]);

  return null; // This component doesn't render anything
}

export default ActivityTracker;
