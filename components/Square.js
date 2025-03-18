// components/Square.js - Update to include animation
import React from 'react';
import { Button, Typography } from '@mui/material';
import { clickSound } from '../utils/sound';
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Square = ({ value, displayValue, onClick, isWinning }) => {
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
        animation: isWinning ? `${pulse} 1s ease-in-out infinite` : 'none',
        backgroundColor: isWinning ? 'rgba(76, 175, 80, 0.2)' : 'inherit',
        border: isWinning ? '2px solid #4CAF50' : '1px solid rgba(0, 0, 0, 0.23)',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: isWinning ? 'rgba(76, 175, 80, 0.3)' : '#e0e0e0',
          transform: isWinning ? 'scale(1.05)' : 'scale(1.05)'
        },
      }}
    >
      <Typography variant="h3" color="textPrimary">
        {displayValue}
      </Typography>
    </Button>
  );
};

export default Square;