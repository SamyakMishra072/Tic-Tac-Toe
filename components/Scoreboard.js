// components/Scoreboard.js
import React from 'react';
import { Paper, Grid, Typography, useTheme } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';

const Scoreboard = ({ scores, playerX, playerO }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: '20px auto',
        maxWidth: 400,
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create('background-color', {
          duration: theme.transitions.duration.short,
        }),
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <EmojiEventsIcon 
            color="primary" 
            fontSize="large"
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography variant="h6" align="center" sx={{ color: 'text.primary' }}>
            {playerX}: {scores.X}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CloseIcon 
            color="error" 
            fontSize="large"
            sx={{ color: theme.palette.error.main }}
          />
          <Typography variant="h6" align="center" sx={{ color: 'text.primary' }}>
            {playerO}: {scores.O}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center" sx={{ color: 'text.primary' }}>
            Draws: {scores.Draws}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Scoreboard;