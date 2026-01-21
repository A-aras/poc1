import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { getApp2Cards } from './app2';

export default function App() {
  const cards = getApp2Cards();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          App 2 - Detailed View
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2 }}>
          {cards.map((card) => (
            <Paper key={card.id} sx={{ p: 2 }}>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {card.description}
              </Typography>
              {card.metadata && (
                <Box sx={{ mt: 1, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
                  <pre style={{ margin: 0, fontSize: '12px' }}>
                    {JSON.stringify(card.metadata, null, 2)}
                  </pre>
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
