// components/Board.js
import React from 'react';
import { Grid, Paper } from '@mui/material';
import Square from './Square';

const Board = ({ board, onMove, winningLine }) => {
  return (
    <Paper elevation={3} sx={{ padding: 1, margin: 'auto', maxWidth: 320 }}>
      <Grid container spacing={1}>
        {board.map((value, index) => (
          <Grid item xs={4} key={index}>
            <Square
              value={value}
              onClick={() => onMove(index)}
              isWinning={winningLine?.includes(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Board;