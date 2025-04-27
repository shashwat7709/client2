
import { useState, useEffect } from 'react';

interface WebsiteStats {
  visitsToday: number;
  pendingMessages: number;
  lastChecked: Date;
}

export function useWebsiteStats() {
  const [stats, setStats] = useState<WebsiteStats>({
    visitsToday: 0,
    pendingMessages: 0,
    lastChecked: new Date(),
  });

  useEffect(() => {
    // Get stored visit count for today
    const today = new Date().toDateString();
    const storedStats = localStorage.getItem('website_stats');
    const parsedStats = storedStats ? JSON.parse(storedStats) : {};
    
    if (parsedStats.date !== today) {
      // Reset for new day
      const newStats = {
        date: today,
        visitsToday: 1,
        pendingMessages: parsedStats.pendingMessages || 0,
      };
      localStorage.setItem('website_stats', JSON.stringify(newStats));
      setStats({
        visitsToday: 1,
        pendingMessages: parsedStats.pendingMessages || 0,
        lastChecked: new Date(),
      });
    } else {
      // Increment visit count
      const updatedStats = {
        ...parsedStats,
        visitsToday: (parsedStats.visitsToday || 0) + 1,
      };
      localStorage.setItem('website_stats', JSON.stringify(updatedStats));
      setStats({
        visitsToday: updatedStats.visitsToday,
        pendingMessages: updatedStats.pendingMessages || 0,
        lastChecked: new Date(),
      });
    }
  }, []);

  return stats;
}
