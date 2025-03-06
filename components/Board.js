import React from 'react';
import { Grid, Paper } from '@mui/material';
import Square from './Square';

const Board = ({ board, onMove }) => {
  return (
    <Paper
      elevation={10}
      sx={{
        padding: 3,
        margin: 'auto',
        maxWidth: 320,
        backgroundColor: '#0a0a0a',
        border: '2px solid rgba(0, 255, 255, 0.8)',
        boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.8)',
        borderRadius: '12px',
        transition: '0.3s ease-in-out',
        '&:hover': {
          boxShadow: '0px 0px 25px rgba(0, 255, 255, 1)',
        },
      }}
    >
      <Grid container spacing={1}>
        {board.map((value, index) => (
          <Grid item xs={4} key={index}>
            <Square value={value} onClick={() => onMove(index)} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Board;
