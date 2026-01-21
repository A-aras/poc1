import React, { useEffect } from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useCardManager, useTabManager } from '@monorepo/common';
import type { Card as CardType } from '@monorepo/common';

// Dynamic Module Federation loader
const loadRemoteModule = async (scope: string, module: string) => {
  // Initialize shared scope
  await __webpack_init_sharing__('default');
  
  const container = window[(scope as any)];
  // Initialize container
  await container.init(__webpack_share_scopes__.default);
  const factory = await window[(scope as any)].get(module);
  return factory();
};

declare const __webpack_init_sharing__: any;
declare const __webpack_share_scopes__: any;

const Dashboard: React.FC = () => {
  const { cards, isLoading, error, updateCards, setCardLoading, setCardError } = useCardManager();
  const { openTab } = useTabManager();

  useEffect(() => {
    const fetchAllCards = async () => {
      setCardLoading(true);
      try {
        const allCards: CardType[] = [];

        // Helper function to load remote cards
        const loadRemoteCards = async (appName: string, port: number) => {
          try {
            // Load remoteEntry.js from remote
            await new Promise((resolve, reject) => {
              const script = document.createElement('script');
              script.src = `http://localhost:${port}/remoteEntry.js`;
              script.onload = resolve;
              script.onerror = reject;
              document.body.appendChild(script);
            });

            // Load the cards module from remote
            const module = await loadRemoteModule(appName, './cards');
            const cardFn = module.default || module[`get${appName.charAt(0).toUpperCase() + appName.slice(1)}Cards`];
            
            if (cardFn && typeof cardFn === 'function') {
              const remoteCards = cardFn();
              allCards.push(...remoteCards);
            }
          } catch (err) {
            console.warn(`Failed to load ${appName} cards:`, err);
          }
        };

        // Load cards from all remote applications
        await loadRemoteCards('app1', 5174);
        await loadRemoteCards('app2', 5175);
        await loadRemoteCards('app3', 5176);

        updateCards(allCards);
        setCardError(null);
      } catch (err) {
        setCardError(err instanceof Error ? err.message : 'Failed to load cards');
        console.error('Error fetching cards:', err);
      } finally {
        setCardLoading(false);
      }
    };

    fetchAllCards();
  }, [updateCards, setCardLoading, setCardError]);

  const handleCardClick = (card: CardType) => {
    // Open the application in a new tab
    openTab({
      id: `${card.appName}-${card.id}`,
      label: card.title,
      appName: card.appName,
      type: 'app',
    });
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {error && <Alert severity="error">{error}</Alert>}

      {cards.length === 0 ? (
        <Alert severity="info">No applications available yet.</Alert>
      ) : (
        <Grid container spacing={2}>
          {cards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(card)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {card.description}
                    </Typography>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      {card.appName}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Dashboard;
