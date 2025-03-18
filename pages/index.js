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
  DialogActions 
} from '@mui/material';
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
  const [gameMode, setGameMode] = useState('single');
  const [playerNames, setPlayerNames] = useState({ X: '', O: 'Computer' });
  const [instructionsOpen, setInstructionsOpen] = useState(false);
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
      
      // Celebration effects
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
    if (gameMode === 'single') {
      setPlayerNames(prev => ({ ...prev, O: 'Computer' }));
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

  // Mode switching
  const switchMode = () => {
    resetSound.play();
    const newMode = gameMode === 'single' ? 'multi' : 'single';
    setGameMode(newMode);
    if (newMode === 'multi' && playerNames.O === 'Computer') {
      setPlayerNames(prev => ({ ...prev, O: '' }));
    }
    resetBoard();
  };

  // AI Move handling
  useEffect(() => {
    if (gameMode === 'single' && !isXNext && !winner) {
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

  // Instructions dialog
  const handleInstructionsOpen = () => setInstructionsOpen(true);
  const handleInstructionsClose = () => setInstructionsOpen(false);

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
        <Button 
          variant="outlined" 
          onClick={handleInstructionsOpen}
          sx={{ alignSelf: 'center' }}
        >
          How to Play
        </Button>

        <Dialog open={instructionsOpen} onClose={handleInstructionsClose}>
          <DialogTitle>How to Play Tic Tac Toe</DialogTitle>
          <DialogContent>
            <DialogContentText component="div">
              <strong>Objective:</strong> Be the first to get 3 marks in a row.
              <br/><br/>
              
              <strong>Game Rules:</strong>
              <ul style={{ paddingLeft: 20, textAlign: 'left' }}>
                <li>Players alternate placing their mark</li>
                <li>X always goes first</li>
                <li>Win with 3 in a row (any direction)</li>
                <li>Draw when board is full</li>
              </ul>

              <strong>Controls:</strong>
              <ul style={{ paddingLeft: 20, textAlign: 'left' }}>
                <li>Click empty squares to play</li>
                <li>Reset button for new game</li>
                <li>Switch modes with top button</li>
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleInstructionsClose} color="primary">
              Got It!
            </Button>
          </DialogActions>
        </Dialog>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <TextField
            label="Player X Name"
            value={playerNames.X}
            onChange={e => setPlayerNames(prev => ({ ...prev, X: e.target.value }))}
          />
          <TextField
            label="Player O Name"
            value={playerNames.O}
            onChange={e => gameMode === 'multi' && 
              setPlayerNames(prev => ({ ...prev, O: e.target.value }))}
            disabled={gameMode === 'single'}
          />
        </Box>

        <Scoreboard 
          scores={scores} 
          playerX={playerNames.X || 'X'} 
          playerO={playerNames.O || 'O'} 
        />

        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            {winner ? (
              winner === 'Draw' ? 
                "It's a Draw!" : 
                `${playerNames[winner] || winner} Wins!`
            ) : (
              `Next Player: ${isXNext ? 
                playerNames.X || 'X' : 
                playerNames.O || 'O'}`
            )}
          </Typography>
          <Board 
            board={board} 
            onMove={handleMove}
            playerX={playerNames.X || 'X'}
            playerO={playerNames.O || 'O'}
            winningLine={winningLine}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={resetBoard}
            
          >
            Reset Game
          </Button>
          <Button 
            variant="outlined" 
            onClick={switchMode}
          
          >
            Switch to {gameMode === 'single' ? 'Multiplayer' : 'Single Player'}
          </Button>
        </Box>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;