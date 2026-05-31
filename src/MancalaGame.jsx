import React from 'react';
import { useGameEngine, player2Mancala, player1Mancala } from './hooks/useGameEngine';
import StartupScreen from './components/StartupScreen';
import GameBoard from './components/GameBoard';
import './MancalaGame.css';

const RULES = [
  '12 casas começam com 4 sementes; cada Mancala inicia com 0.',
  'Clique em uma casa do seu lado para semear anti-horário.',
  'Pule o Mancala do adversário enquanto distribui sementes.',
  'Se a última semente cair em uma casa vazia do seu lado, capture também as sementes opostas.',
  'O jogo termina quando um lado fica sem sementes e o outro coleta o restante.',
];

const MancalaGame = () => {
  const {
    board,
    setBoard,
    currentPlayer,
    setCurrentPlayer,
    gameOver,
    started,
    playerNames,
    playerInputs,
    infoMessage,
    setInfoMessage,
    lastMove,
    setLastMove,
    currentPlayerName,
    isOwnPit,
    getMancalaForPlayer,
    checkEndGame,
    resetGame,
    goToStart,
    handleInputChange,
    startGame,
    gameStatus,
  } = useGameEngine('Insira os nomes e comece a partida.');

  const handlePitClick = (index) => {
    if (gameOver) return;
    if (!isOwnPit(currentPlayer, index)) return;
    if (board[index] === 0) return;

    const nextBoard = [...board];
    let stones = nextBoard[index];
    nextBoard[index] = 0;
    let currentIndex = index;

    // Distribui sementes anti-horário, pulando o Mancala adversário
    while (stones > 0) {
      currentIndex = (currentIndex + 1) % 14;
      if (currentPlayer === 1 && currentIndex === player2Mancala) continue;
      if (currentPlayer === 2 && currentIndex === player1Mancala) continue;
      nextBoard[currentIndex] += 1;
      stones -= 1;
    }

    const lastIndex = currentIndex;
    const ownMancala = getMancalaForPlayer(currentPlayer);
    const opponentPlayer = currentPlayer === 1 ? 2 : 1;
    const selectedPitLabel = currentPlayer === 1 ? `P1-${index + 1}` : `P2-${index - 6}`;
    let moveMessage = `${currentPlayerName} semeou ${board[index]} sementes de ${selectedPitLabel}.`;
    let captureMessage = '';

    // Captura: se a última semente cair em uma casa vazia do jogador atual,
    // leva a semente depositada mais todas as sementes da casa oposta.
    const isCaptureMove = isOwnPit(currentPlayer, lastIndex) && nextBoard[lastIndex] === 1;
    if (isCaptureMove) {
      const oppositeIndex = 12 - lastIndex;
      const oppositeSeeds = nextBoard[oppositeIndex];
      const capturedTotal = oppositeSeeds + 1;
      nextBoard[ownMancala] += capturedTotal;
      nextBoard[lastIndex] = 0;
      nextBoard[oppositeIndex] = 0;
      captureMessage = ` Captura! Última semente caiu em casa vazia do seu lado e capturou ${oppositeSeeds} semente(s) da casa oposta. ${capturedTotal} sementes foram movidas para o seu Mancala.`;
      moveMessage += captureMessage;
    }

    const hadExtraTurn = lastIndex === ownMancala;
    const nextPlayer = hadExtraTurn ? currentPlayer : opponentPlayer;
    if (hadExtraTurn) {
      moveMessage += ` Última semente caiu no Mancala de ${currentPlayerName}, você ganha jogada extra.`;
    } else if (!isCaptureMove) {
      moveMessage += ` Próximo jogador: ${playerNames[`player${nextPlayer}`]}.`;
    }

    setBoard(nextBoard);
    setLastMove({ index: lastIndex, capture: isCaptureMove, extraTurn: hadExtraTurn });
    if (!checkEndGame(nextBoard)) {
      setCurrentPlayer(nextPlayer);
      setInfoMessage(moveMessage);
    }
  };

  const showHelp = () => {
    setInfoMessage(
      'Dica: clique em uma cavidade do seu lado para semear as sementes. Capture quando a última cair em uma casa vazia do seu lado.'
    );
  };

  return (
    <div className="mancala-shell">
      <h1>Kalah</h1>
      <p className="subtitle">
        De origem africana e com ricas variações, o Mancala nos ensina que a vida é um fascinante exercício de semeadura.
        Mais do que um jogo, é uma lição sobre como cultivar e distribuir nossos recursos e essência para que, ao final do ciclo, possamos colher os melhores frutos.
      </p>

      {!started ? (
        <StartupScreen
          title="Bem-vindo ao Kalah"
          subtitle="Escolha os nomes dos jogadores e revise as regras antes de começar."
          rules={RULES}
          playerInputs={playerInputs}
          handleInputChange={handleInputChange}
          startGame={startGame}
          idPrefix="kalah"
        />
      ) : (
        <GameBoard
          board={board}
          currentPlayer={currentPlayer}
          playerNames={playerNames}
          gameOver={gameOver}
          lastMove={lastMove}
          gameStatus={gameStatus}
          infoMessage={infoMessage}
          isOwnPit={isOwnPit}
          handlePitClick={handlePitClick}
          showHelp={showHelp}
          goToStart={goToStart}
          resetGame={resetGame}
          resetLabel="Reiniciar Kalah"
        />
      )}
    </div>
  );
};

export default MancalaGame;
