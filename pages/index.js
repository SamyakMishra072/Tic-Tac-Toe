// pages/index.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Button, 
  Typography, 
  Box, 
  TextField,
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import ComputerIcon from '@mui/icons-material/Computer';
import GroupsIcon from '@mui/icons-material/Groups';
import confetti from 'canvas-confetti';
import Header from '../components/Header';
import Board from '../components/Board';
import Scoreboard from '../components/Scoreboard';
import Footer from '../components/Footer';
import { calculateWinner } from '../utils/gameLogic';
import {
  winSound,
  drawSound,
  resetSound,
  playBackgroundMusic,
  pauseBackgroundMusic,
} from '../utils/sound';

const Home = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('ai'); // 'ai' or 'local'
  const [playerNames, setPlayerNames] = useState({ X: 'Player X', O: 'Player O' });
  const [instructionsOpen, setInstructionsOpen] = useState(false);
  const [modeSelectOpen, setModeSelectOpen] = useState(false);
  const [winningLine, setWinningLine] = useState([]);

  // Sound and music handlers
  useEffect(() => {
    playBackgroundMusic();
    return () => pauseBackgroundMusic();
  }, []);

  // Game logic
  useEffect(() => {
    const result = calculateWinner(board);
    
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({ 
        ...prev, 
        [result.winner]: prev[result.winner] + 1 
      }));
      
      winSound.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4CAF50', '#2196F3', '#FFC107']
      });
      
      setTimeout(resetBoard, 3000);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
      drawSound.play();
      setTimeout(resetBoard, 2000);
    }
  }, [board]);

  // Player name handling
  useEffect(() => {
    if (gameMode === 'ai') {
      setPlayerNames(prev => ({ 
        ...prev, 
        O: 'Computer',
        X: prev.X || 'Player X'
      }));
    } else {
      setPlayerNames(prev => ({
        X: prev.X || 'Player X',
        O: prev.O || 'Player O'
      }));
    }
  }, [gameMode]);

  // Game controls
  const handleMove = index => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    resetSound.play();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine([]);
  };

  // AI Logic
  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    if (result?.winner === 'O') return 10 - depth;
    if (result?.winner === 'X') return depth - 10;
    if (!currentBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (!currentBoard[i]) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  // AI Move handling
  useEffect(() => {
    if (gameMode === 'ai' && !isXNext && !winner) {
      const aiMove = getBestMove(board);
      if (aiMove !== -1) {
        const timeout = setTimeout(() => {
          const newBoard = [...board];
          newBoard[aiMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }, 500);
        return () => clearTimeout(timeout);
      }
    }
  }, [board, isXNext, gameMode, winner]);

  return (
    <div>
      <Header />
      <Container sx={{ 
        textAlign: 'center', 
        marginTop: 4, 
        paddingBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Game Mode Display */}
        <Typography variant="h6" color="primary">
          {gameMode === 'ai' ? "Single Player vs AI" : "Local Multiplayer"}
        </Typography>

        {/* Mode Selection Dialog */}
        <Dialog open={modeSelectOpen} onClose={() => setModeSelectOpen(false)}>
          <DialogTitle>Select Game Mode</DialogTitle>
          <DialogContent>
            <List>
              <ListItem 
                button 
                onClick={() => {
                  setGameMode('ai');
                  setModeSelectOpen(false);
                  resetBoard();
                }}
              >
                <ListItemIcon>
                  <ComputerIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Single Player" 
                  secondary="Play against computer AI" 
                />
              </ListItem>

              <ListItem 
                button 
                onClick={() => {
                  setGameMode('local');
                  setModeSelectOpen(false);
                  resetBoard();
                }}
              >
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Local Multiplayer" 
                  secondary="Two players on this device" 
                />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>

        {/* Controls Row */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => setModeSelectOpen(true)}
            startIcon={<GroupsIcon />}
          >
            Change Game Mode
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setInstructionsOpen(true)}
          >
            How to Play
          </Button>
        </Box>

        {/* Instructions Dialog */}
        <Dialog open={instructionsOpen} onClose={() => setInstructionsOpen(false)}>
          <DialogTitle>How to Play</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              {/* Keep existing instructions content */}
              <p>Goal: Get 3 of your marks (X or O) in a row — horizontally, vertically, or diagonally to Win else Game will be Draw.</p>
              <p>👥 Player vs Player:</p>
              <p>1. Two players take turns.</p>
              <p>2. Player 1 is X, Player 2 is O.</p>
              <p>3. Tap a cell to place your mark.</p>
              <p>🤖 Player vs Computer:</p>
              <p>1. You play against a smart computer.</p>
              <p>2. Turns alternate — the computer moves automatically.</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setInstructionsOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        {/* Player Names */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <TextField
            label={gameMode === 'ai' ? "Your Name" : "Player X Name"}
            value={playerNames.X}
            onChange={e => setPlayerNames(prev => ({ ...prev, X: e.target.value }))}
          />
          <TextField
            label={gameMode === 'ai' ? "Computer Name" : "Player O Name"}
            value={playerNames.O}
            onChange={e => gameMode === 'local' && 
              setPlayerNames(prev => ({ ...prev, O: e.target.value }))}
            disabled={gameMode === 'ai'}
          />
        </Box>

        {/* Scoreboard */}
        <Scoreboard 
          scores={scores} 
          playerX={playerNames.X} 
          playerO={playerNames.O} 
        />

        {/* Game Board */}
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            {winner ? (
              winner === 'Draw' ? 
                "It's a Draw!" : 
                `${playerNames[winner]} Wins!`
            ) : (
              `Next Player: ${isXNext ? 
                playerNames.X : 
                playerNames.O}`
            )}
          </Typography>
          <Board 
            board={board} 
            onMove={handleMove}
            playerX={playerNames.X}
            playerO={playerNames.O}
            winningLine={winningLine}
          />
        </Box>

        {/* Game Controls */}
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={resetBoard}
          >
            Reset Game
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;