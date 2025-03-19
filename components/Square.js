// components/Square.js
import React from 'react';
import { Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { clickSound } from '../utils/sound';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Square = ({ value, onClick, isWinning }) => {
  const handleClick = () => {
    if (!value) {
      clickSound.play();
      onClick();
    }
  };

  return (
    <Button
      variant="outlined"
      onClick={handleClick}
      sx={{
        width: '100px',
        height: '100px',
        fontSize: '2rem',
        animation: isWinning ? `${pulse} 1s infinite` : 'none',
        backgroundColor: isWinning ? 'rgba(76, 175, 80, 0.2)' : 'inherit',
        border: isWinning ? '2px solid #4CAF50' : '1px solid rgba(0, 0, 0, 0.23)',
        '&:hover': {
          backgroundColor: isWinning ? 'rgba(76, 175, 80, 0.3)' : '#e0e0e0'
        }
      }}
    >
      <Typography variant="h3" color="textPrimary">
        {value}
      </Typography>
    </Button>
  );
};

export default Square;