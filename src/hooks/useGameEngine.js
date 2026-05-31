import { useState, useEffect, useMemo, useCallback } from 'react';

export const INITIAL_BOARD = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

export const player1Pits = [0, 1, 2, 3, 4, 5];
export const player2Pits = [7, 8, 9, 10, 11, 12];
export const player1Mancala = 6;
export const player2Mancala = 13;

export const useGameEngine = (initialInfoMessage = 'Insira os nomes e comece a partida.') => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [started, setStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({ player1: 'Jogador 1', player2: 'Jogador 2' });
  const [playerInputs, setPlayerInputs] = useState({ player1: '', player2: '' });
  const [infoMessage, setInfoMessage] = useState(initialInfoMessage);
  const [lastMove, setLastMove] = useState({ index: null, capture: false, extraTurn: false });

  // Sorteia aleatoriamente quem começa ao montar o componente
  useEffect(() => {
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
  }, []);

  const currentPlayerName = playerNames[`player${currentPlayer}`];

  const isOwnPit = useCallback((player, index) => {
    return player === 1 ? player1Pits.includes(index) : player2Pits.includes(index);
  }, []);

  const getMancalaForPlayer = useCallback((player) => {
    return player === 1 ? player1Mancala : player2Mancala;
  }, []);

  const isPlayerPitRowEmpty = useCallback((player, boardState) => {
    const pits = player === 1 ? player1Pits : player2Pits;
    return pits.every((index) => boardState[index] === 0);
  }, []);

  const collectRemainingSeeds = useCallback((boardState) => {
    const nextBoard = [...boardState];
    if (isPlayerPitRowEmpty(1, nextBoard) && !isPlayerPitRowEmpty(2, nextBoard)) {
      const remaining = player2Pits.reduce((sum, index) => sum + nextBoard[index], 0);
      player2Pits.forEach((index) => {
        nextBoard[index] = 0;
      });
      nextBoard[player2Mancala] += remaining;
    }

    if (isPlayerPitRowEmpty(2, nextBoard) && !isPlayerPitRowEmpty(1, nextBoard)) {
      const remaining = player1Pits.reduce((sum, index) => sum + nextBoard[index], 0);
      player1Pits.forEach((index) => {
        nextBoard[index] = 0;
      });
      nextBoard[player1Mancala] += remaining;
    }

    return nextBoard;
  }, [isPlayerPitRowEmpty]);

  const determineWinner = useCallback((boardState) => {
    if (boardState[player1Mancala] > boardState[player2Mancala]) return 1;
    if (boardState[player2Mancala] > boardState[player1Mancala]) return 2;
    return 'draw';
  }, []);

  const checkEndGame = useCallback((boardState) => {
    const player1Empty = isPlayerPitRowEmpty(1, boardState);
    const player2Empty = isPlayerPitRowEmpty(2, boardState);
    if (player1Empty || player2Empty) {
      const collectedBoard = collectRemainingSeeds(boardState);
      setGameOver(true);
      const finalWinner = determineWinner(collectedBoard);
      setWinner(finalWinner);
      setBoard(collectedBoard);
      const finalText =
        finalWinner === 'draw'
          ? 'Empate!'
          : `${playerNames[`player${finalWinner}`]} venceu.`;
      setInfoMessage(
        `${finalText} Pontuação final — ${playerNames.player1}: ${collectedBoard[player1Mancala]}, ${playerNames.player2}: ${collectedBoard[player2Mancala]}.`
      );
      return true;
    }
    return false;
  }, [isPlayerPitRowEmpty, collectRemainingSeeds, determineWinner, playerNames]);

  const resetGame = useCallback(() => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
    setGameOver(false);
    setWinner(null);
    setLastMove({ index: null, capture: false, extraTurn: false });
    setInfoMessage('Partida reiniciada. Boa sorte!');
  }, []);

  const goToStart = useCallback(() => {
    setStarted(false);
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setLastMove({ index: null, capture: false, extraTurn: false });
    setInfoMessage(initialInfoMessage);
    setPlayerInputs(playerNames);
  }, [playerNames, initialInfoMessage]);

  const handleInputChange = useCallback((player, value) => {
    setPlayerInputs((prev) => ({ ...prev, [player]: value }));
  }, []);

  const startGame = useCallback(() => {
    const names = {
      player1: playerInputs.player1.trim() || 'Jogador 1',
      player2: playerInputs.player2.trim() || 'Jogador 2',
    };
    const firstPlayer = Math.random() < 0.5 ? 1 : 2;
    setPlayerNames(names);
    setStarted(true);
    setCurrentPlayer(firstPlayer);
    setInfoMessage(`Bem-vindo, ${names.player1} e ${names.player2}! ${names[`player${firstPlayer}`]} começa.`);
  }, [playerInputs]);

  const gameStatus = useMemo(() => {
    if (!started) {
      return 'Preparando partida...';
    }
    if (gameOver) {
      if (winner === 'draw') return 'Empate!';
      return `Fim de jogo: vencedor é ${playerNames[`player${winner}`]}`;
    }
    return `Vez de: ${currentPlayerName}`;
  }, [currentPlayerName, gameOver, started, winner, playerNames]);

  return {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    gameOver,
    setGameOver,
    winner,
    setWinner,
    started,
    setStarted,
    playerNames,
    setPlayerNames,
    playerInputs,
    setPlayerInputs,
    infoMessage,
    setInfoMessage,
    lastMove,
    setLastMove,
    currentPlayerName,
    isOwnPit,
    getMancalaForPlayer,
    isPlayerPitRowEmpty,
    collectRemainingSeeds,
    determineWinner,
    checkEndGame,
    resetGame,
    goToStart,
    handleInputChange,
    startGame,
    gameStatus,
  };
};
