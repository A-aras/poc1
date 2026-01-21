import React, { useEffect } from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useCardManager, useTabManager } from '@monorepo/common';
import type { Card as CardType } from '@monorepo/common';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const { cards, isLoading, error, updateCards, setCardLoading, setCardError } = useCardManager();
  const { openTab } = useTabManager();

  useEffect(() => {
    const fetchAllCards = async () => {
      setCardLoading(true);
      try {
        // In a real scenario, you would aggregate cards from multiple micro-apps
        // For now, we'll simulate this
        const allCards: CardType[] = [];
        
        // You can add logic here to fetch from different app endpoints
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
