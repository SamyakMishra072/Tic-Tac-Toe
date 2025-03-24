// components/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
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
  const colorMode = React.useContext(ColorModeContext);

  const handleMuteToggle = () => {
    if (isMuted) {
      unmuteAll();
    } else {
      muteAll();
    }
    setIsMuted(!isMuted);
  };

  return (
    <AppBar position="static" color="primary" enableColorOnDark>
      <Toolbar>
        <SportsEsportsIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tic Tac Toe
        </Typography>
        
        {/* Theme Toggle */}
        <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>

        {/* Sound Toggle */}
        <IconButton color="inherit" onClick={handleMuteToggle}>
          {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;