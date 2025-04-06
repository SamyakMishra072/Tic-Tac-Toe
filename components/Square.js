import React from 'react';
import { Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import { clickSound } from '../utils/sound';
import { Scale } from '@mui/icons-material';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Square = ({ value, onClick, isWinning }) => {
  const theme = useTheme(); 
  const isDarkMode = theme.palette.mode === 'dark';

  const textColor = isDarkMode ? '#FFFFFF' : '#000000';
  const bgColor = isDarkMode ? '#333' : '#f5f5f5'; 
  const hoverColor = isDarkMode ? '#444' : '#e0e0e0'; 
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
      backgroundColor: isWinning ? 'rgba(76, 175, 80, 0.2)' : bgColor,
      border: isWinning ? '2px solid #4CAF50' : `1px solid ${isDarkMode ? '#666' : 'rgba(0, 0, 0, 0.23)'}`,
      '&:hover': {
        backgroundColor: hoverColor, 
        '& .text-animation': { 
          transform: 'scale(1.3)', 
        }
      }
    }}
  >
    <Typography
      variant="h3"
      className="text-animation"
      sx={{
        color: textColor,
        textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        transform: 'scale(1)',
        transition: 'transform 0.3s ease-in-out',
      }}
    >
      {value}
    </Typography>
  </Button>
  
  );
};

export default Square;
