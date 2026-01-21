import React, { useEffect, useRef } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';

interface AppContainerProps {
  appId: string;
  appName: string;
}

const AppContainer: React.FC<AppContainerProps> = ({ appId, appName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    const loadApp = async () => {
      try {
        setLoading(true);
        // In a real scenario, you would dynamically load the micro-app here
        // This could be done using:
        // 1. Dynamic imports with script tags
        // 2. Module federation (webpack)
        // 3. Custom element/web components
        // 4. iframe isolation
        
        if (containerRef.current) {
          containerRef.current.innerHTML = `<div style="padding: 20px;"><h2>${appName}</h2><p>App content for ${appId} would be rendered here</p></div>`;
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load application');
        console.error('Error loading app:', err);
      } finally {
        setLoading(false);
      }
    };

    loadApp();
  }, [appId, appName]);

  return (
    <Box>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      <Box ref={containerRef} />
    </Box>
  );
};

export default AppContainer;
