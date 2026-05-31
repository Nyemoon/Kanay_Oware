import React from 'react';
import { useGameEngine, player1Pits, player2Pits } from './hooks/useGameEngine';
import StartupScreen from './components/StartupScreen';
import GameBoard from './components/GameBoard';
import './MancalaGame.css';

const RULES = [
  '12 casas começam com 4 sementes; cada Armazém inicia com 0.',
  'Clique em uma casa do seu lado para semear anti-horário.',
  'Pule AMBOS os Armazéns enquanto distribui sementes — sementes só entram por capturas.',
  'Capture quando a última semente cair em uma casa adversária COM exatamente 2 ou 3 sementes.',
  'Você também captura casas anteriores se tiverem 2 ou 3 sementes (efeito cascata).',
  'O jogo termina quando um lado fica sem sementes e o outro coleta o restante.',
];

const OwareGame = () => {
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

  const isOpponentPit = (player, index) => {
    return player === 1 ? player2Pits.includes(index) : player1Pits.includes(index);
  };

  const handlePitClick = (index) => {
    if (gameOver) return;
    if (!isOwnPit(currentPlayer, index)) return;
    if (board[index] === 0) return;

    const nextBoard = [...board];
    let stones = nextBoard[index];
    nextBoard[index] = 0;
    let currentIndex = index;

    // LÓGICA DO OWARE: Pula AMBOS os Mancalas durante a semeadura
    while (stones > 0) {
      currentIndex = (currentIndex + 1) % 14;
      if (currentIndex === 6 || currentIndex === 13) continue;
      nextBoard[currentIndex] += 1;
      stones -= 1;
    }

    const lastIndex = currentIndex;
    const ownMancala = getMancalaForPlayer(currentPlayer);
    const opponentPlayer = currentPlayer === 1 ? 2 : 1;
    const selectedPitLabel = currentPlayer === 1 ? `P1-${index + 1}` : `P2-${index - 6}`;
    let moveMessage = `${currentPlayerName} semeou ${board[index]} sementes de ${selectedPitLabel}.`;
    let captureMessage = '';

    // LÓGICA DO OWARE: Captura se cair em casa adversária e a deixar com 2 ou 3 sementes (Efeito Cascata)
    let checkIdx = lastIndex;
    let capturedTotal = 0;

    while (isOpponentPit(currentPlayer, checkIdx) && (nextBoard[checkIdx] === 2 || nextBoard[checkIdx] === 3)) {
      capturedTotal += nextBoard[checkIdx];
      nextBoard[checkIdx] = 0;
      
      // Retrocede uma casa para continuar verificando a cascata, pulando os Mancalas
      checkIdx = (checkIdx - 1 + 14) % 14;
      if (checkIdx === 6 || checkIdx === 13) {
        checkIdx = (checkIdx - 1 + 14) % 14;
      }
    }

    if (capturedTotal > 0) {
      nextBoard[ownMancala] += capturedTotal;
      captureMessage = ` Grande jogada! Captura em cascata rendeu ${capturedTotal} sementes para o armazém de ${currentPlayerName}.`;
      moveMessage += captureMessage;
    }

    // LÓGICA DO OWARE: Nunca há turno extra. O turno sempre passa.
    const nextPlayer = opponentPlayer;
    moveMessage += ` Próximo jogador: ${playerNames[`player${nextPlayer}`]}.`;

    setBoard(nextBoard);
    setLastMove({ index: lastIndex, capture: capturedTotal > 0, extraTurn: false });
    if (!checkEndGame(nextBoard)) {
      setCurrentPlayer(nextPlayer);
      setInfoMessage(moveMessage);
    }
  };

  const showHelp = () => {
    setInfoMessage(
      'Oware: Semeie pulando os dois armazéns. Você captura sementes se sua ÚLTIMA semente cair no lado adversário e deixar a casa com exatas 2 ou 3 sementes (captura as anteriores também se tiverem 2 ou 3!).'
    );
  };

  return (
    <div className="mancala-shell">
      <h1>Oware</h1>
      <p className="subtitle">
        Nascido na África Ocidental, o Oware é um jogo focado em cálculo profundo. Não se depositam sementes nos armazéns durante a semeadura, apenas por meio de capturas estratégicas em grupos de dois ou três.
      </p>

      {!started ? (
        <StartupScreen
          title="Bem-vindo ao Oware"
          subtitle="Escolha os nomes dos jogadores e revise as regras antes de começar."
          rules={RULES}
          playerInputs={playerInputs}
          handleInputChange={handleInputChange}
          startGame={startGame}
          idPrefix="oware"
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
          resetLabel="Reiniciar Oware"
        />
      )}
    </div>
  );
};

export default OwareGame;