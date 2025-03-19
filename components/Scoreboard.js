// components/Scoreboard.js
import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';

const Scoreboard = ({ scores, playerX, playerO }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: '20px auto',
        maxWidth: 400,
        backgroundColor: '#ffffff',
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <EmojiEventsIcon color="primary" fontSize="large" />
          <Typography variant="h6" align="center">
            {playerX}: {scores.X}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CloseIcon color="error" fontSize="large" />
          <Typography variant="h6" align="center">
            {playerO}: {scores.O}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6" align="center">
            Draws: {scores.Draws}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Scoreboard;