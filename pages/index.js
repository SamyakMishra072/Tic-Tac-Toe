// pages/index.js

import React, { useState, useEffect } from 'react';
import { Container, Button, Typography, Box, TextField } from '@mui/material';
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

  useEffect(() => {
    playBackgroundMusic();
    return () => {
      pauseBackgroundMusic();
    };
  }, []);

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setScores((prevScores) => ({ ...prevScores, [win]: prevScores[win] + 1 }));
      winSound.play();
      setTimeout(resetBoard, 2000);
    } else if (!board.includes(null)) {
      setWinner('Draw');
      setScores((prevScores) => ({ ...prevScores, Draws: prevScores.Draws + 1 }));
      drawSound.play();
      setTimeout(resetBoard, 2000);
    }
  }, [board]);

  useEffect(() => {
    if (gameMode === 'single') {
      setPlayerNames((prev) => ({ ...prev, O: 'Computer' }));
    }
  }, [gameMode]);

  const handleMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const makeMove = (index) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetBoard = () => {
    resetSound.play();
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

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
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
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

  const switchMode = () => {
    resetSound.play();
    const newMode = gameMode === 'single' ? 'multi' : 'single';
    setGameMode(newMode);
    if (newMode === 'multi' && playerNames.O === 'Computer') {
      setPlayerNames((prev) => ({ ...prev, O: '' }));
    }
    resetBoard();
  };

  useEffect(() => {
    if (gameMode === 'single' && !isXNext && !winner) {
      const aiMove = getBestMove(board);
      if (aiMove !== -1) {
        const aiMoveTimeout = setTimeout(() => {
          makeMove(aiMove);
        }, 500);
        return () => clearTimeout(aiMoveTimeout);
      }
    }
  }, [board, isXNext, gameMode, winner]);

  return (
    <div>
      <Header />
      <Container sx={{ textAlign: 'center', marginTop: 4, paddingBottom: '60px' }}>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Player X Name"
            value={playerNames.X}
            onChange={(e) => setPlayerNames((prev) => ({ ...prev, X: e.target.value }))}
            sx={{ mr: 2 }}
          />
          <TextField
            label="Player O Name"
            value={playerNames.O}
            onChange={(e) => {
              if (gameMode === 'multi') {
                setPlayerNames((prev) => ({ ...prev, O: e.target.value }));
              }
            }}
            disabled={gameMode === 'single'}
          />
        </Box>
        <Scoreboard scores={scores} playerX={playerNames.X || 'X'} playerO={playerNames.O || 'O'} />
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" gutterBottom>
            {winner
              ? winner === 'Draw'
                ? "It's a Draw!"
                : `${playerNames[winner] || winner} Wins!`
              : `Next Player: ${isXNext ? playerNames.X || 'X' : playerNames.O || 'O'}`}
          </Typography>
          <Board 
  board={board} 
  onMove={handleMove}
  playerX={playerNames.X || 'X'}  // Add these 2 new props
  playerO={playerNames.O || 'O'}
/>
        </Box>
        <Button variant="contained" color="secondary" onClick={resetBoard} sx={{ mr: 2 }}>
          Reset Game
        </Button>
        <Button variant="outlined" onClick={switchMode}>
          Switch to {gameMode === 'single' ? 'Multiplayer' : 'Single Player'}
        </Button>
      </Container>
      <Footer />
    </div>
  );
};

export default Home;