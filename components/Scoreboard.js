import React from 'react';
import { Paper, Grid, Typography } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CloseIcon from '@mui/icons-material/Close';

const Scoreboard = ({ scores }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        margin: '20px auto',
        maxWidth: 400,
        backgroundColor: '#000', // Solid black background
        color: '#fff', // White text for contrast
        position: 'relative',
        zIndex: 10,
      }}
    >
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={4}>
          <EmojiEventsIcon sx={{ color: '#FFD700' }} fontSize="large" /> {/* Gold color for Trophy */}
          <Typography variant="h6" align="center">
            X: {scores.X}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <CloseIcon sx={{ color: '#FF0000' }} fontSize="large" /> {/* Red for O */}
          <Typography variant="h6" align="center">
            O: {scores.O}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              backgroundColor: '#fff', // White box for better visibility
              color: '#000', // Black text inside
              padding: '5px',
              borderRadius: '5px',
              fontWeight: 'bold',
            }}
          >
            Draws: {scores.Draws}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Scoreboard;
