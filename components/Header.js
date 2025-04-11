// components/Header.js
import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { muteAll, unmuteAll } from '../utils/sound';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../pages/_app';

const Header = () => {
  const [isMuted, setIsMuted] = useState(false);
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleMuteToggle = () => {
    if (isMuted) {
      unmuteAll();
    } else {
      muteAll();
    }
    setIsMuted(!isMuted);
  };

  return (
    <AppBar
  position="sticky"
  sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
  }}
>
  <Toolbar>
    <img src="/logg.svg" alt="Logo" style={{ width: 200, marginRight: 12 }} />

    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}
    >
      {/* Tic Tac Toes */}
    </Typography>

    <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>

    <IconButton color="inherit" onClick={handleMuteToggle}>
      {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
    </IconButton>
  </Toolbar>
</AppBar>

  );
};

export default Header;
