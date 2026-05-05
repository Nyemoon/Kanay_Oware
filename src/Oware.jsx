import React, { useEffect, useMemo, useState } from 'react';
import './MancalaGame.css';

const INITIAL_BOARD = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

const OwareGame = () => {
  const [board, setBoard] = useState(INITIAL_BOARD);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [started, setStarted] = useState(false);
  const [playerNames, setPlayerNames] = useState({ player1: 'Jogador 1', player2: 'Jogador 2' });
  const [playerInputs, setPlayerInputs] = useState({ player1: '', player2: '' });
  const [infoMessage, setInfoMessage] = useState('Insira os nomes e comece a partida.');
  const [lastMove, setLastMove] = useState({ index: null, capture: false, extraTurn: false });

  useEffect(() => {
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
  }, []);

  const player1Pits = [0, 1, 2, 3, 4, 5];
  const player2Pits = [7, 8, 9, 10, 11, 12];
  const player1Mancala = 6;
  const player2Mancala = 13;

  const currentPlayerName = playerNames[`player${currentPlayer}`];
  const opponentPlayerName = playerNames[`player${currentPlayer === 1 ? 2 : 1}`];

  const isOwnPit = (player, index) => {
    return player === 1 ? player1Pits.includes(index) : player2Pits.includes(index);
  };

  const isOpponentPit = (player, index) => {
    return player === 1 ? player2Pits.includes(index) : player1Pits.includes(index);
  };

  const getMancalaForPlayer = (player) => (player === 1 ? player1Mancala : player2Mancala);

  const isPlayerPitRowEmpty = (player, boardState) => {
    const pits = player === 1 ? player1Pits : player2Pits;
    return pits.every((index) => boardState[index] === 0);
  };

  const collectRemainingSeeds = (boardState) => {
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
  };

  const determineWinner = (boardState) => {
    if (boardState[player1Mancala] > boardState[player2Mancala]) return 1;
    if (boardState[player2Mancala] > boardState[player1Mancala]) return 2;
    return 'draw';
  };

  const checkEndGame = (boardState) => {
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

  const resetGame = () => {
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(Math.random() < 0.5 ? 1 : 2);
    setGameOver(false);
    setWinner(null);
    setLastMove({ index: null, capture: false, extraTurn: false });
    setInfoMessage('Partida reiniciada. Boa sorte!');
  };

  const goToStart = () => {
    setStarted(false);
    setBoard(INITIAL_BOARD);
    setCurrentPlayer(1);
    setGameOver(false);
    setWinner(null);
    setLastMove({ index: null, capture: false, extraTurn: false });
    setInfoMessage('Atualize os nomes se quiser e inicie outra partida.');
    setPlayerInputs(playerNames);
  };

  const showHelp = () => {
    setInfoMessage(
      'Oware: Semeie pulando os dois armazéns. Você captura sementes se sua ÚLTIMA semente cair no lado adversário e deixar a casa com exatas 2 ou 3 sementes (captura as anteriores também se tiverem 2 ou 3!).'
    );
  };

  const handleInputChange = (player, value) => {
    setPlayerInputs((prev) => ({ ...prev, [player]: value }));
  };

  const startGame = () => {
    const names = {
      player1: playerInputs.player1.trim() || 'Jogador 1',
      player2: playerInputs.player2.trim() || 'Jogador 2',
    };
    const firstPlayer = Math.random() < 0.5 ? 1 : 2;
    setPlayerNames(names);
    setStarted(true);
    setCurrentPlayer(firstPlayer);
    setInfoMessage(`Bem-vindo ao Oware, ${names.player1} e ${names.player2}! ${names[`player${firstPlayer}`]} começa.`);
  };

  const gameStatus = useMemo(() => {
    if (!started) return 'Preparando partida...';
    if (gameOver) {
      if (winner === 'draw') return 'Empate!';
      return `Vencedor: ${playerNames[`player${winner}`]}!`;
    }
    return `Vez de: ${currentPlayerName}`;
  }, [currentPlayer, currentPlayerName, gameOver, started, winner, playerNames]);

  return (
    <div className="mancala-shell">
      <h1>Variante: Oware</h1>
      <p className="subtitle">Nascido na África Ocidental, o Oware é um jogo focado em cálculo profundo. Não se depositam sementes nos armazéns durante a semeadura, apenas por meio de capturas estratégicas em grupos de dois ou três.</p>

      {!started ? (
        <div className="startup-screen">
          <div className="startup-card">
            <h2>Bem-vindo ao Oware</h2>
            <p className="subtitle">Escolha os nomes dos jogadores e revise as regras antes de começar.</p>

            <div className="input-group">
              <label htmlFor="player1">Seu nome</label>
              <input
                id="player1"
                type="text"
                value={playerInputs.player1}
                placeholder="Jogador 1"
                onChange={(e) => handleInputChange('player1', e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="player2">Nome do adversário</label>
              <input
                id="player2"
                type="text"
                value={playerInputs.player2}
                placeholder="Jogador 2"
                onChange={(e) => handleInputChange('player2', e.target.value)}
              />
            </div>

            <div className="rules-panel">
              <h3>Regras principais</h3>
              <ul className="rules-list">
                <li>12 casas começam com 4 sementes; cada Armazém inicia com 0.</li>
                <li>Clique em uma casa do seu lado para semear anti-horário.</li>
                <li>Pule AMBOS os Armazéns enquanto distribui sementes — sementes só entram por capturas.</li>
                <li>Capture quando a última semente cair em uma casa adversária COM exatamente 2 ou 3 sementes.</li>
                <li>Você também captura casas anteriores se tiverem 2 ou 3 sementes (efeito cascata).</li>
                <li>O jogo termina quando um lado fica sem sementes e o outro coleta o restante.</li>
              </ul>
            </div>

            <button className="start-button" onClick={startGame}>
              Começar partida
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="status-box">
            <div><span className="status-label">Status:</span> <span className="status-text">{gameStatus}</span></div>
            <div className="info-box">{infoMessage}</div>
          </div>

          <div className="board-base">
            <div className="board-shell">
              <div className="mancala-pit mancala-large mancala-top">
                <span className="mancala-title">{playerNames.player2}</span>
                <span className="seed-count">{board[player2Mancala]}</span>
              </div>

              <div className="middle-board">
                <div className="pit-row top-row">
                  {player2Pits.slice().reverse().map((index) => {
                    const disabled = !isOwnPit(currentPlayer, index) || board[index] === 0 || gameOver;
                    const isLast = lastMove.index === index;
                    return (
                      <button key={index} className={`pit ${disabled ? 'pit-disabled' : ''} ${isLast ? 'pit-last-move' : ''}`} onClick={() => handlePitClick(index)} disabled={disabled}>
                        <span className="pit-label">{`P2-${index - 6}`}</span>
                        <span className="pit-seeds">{board[index]}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="pit-row bottom-row">
                  {player1Pits.map((index) => {
                    const disabled = !isOwnPit(currentPlayer, index) || board[index] === 0 || gameOver;
                    const isLast = lastMove.index === index;
                    return (
                      <button key={index} className={`pit ${disabled ? 'pit-disabled' : ''} ${isLast ? 'pit-last-move' : ''}`} onClick={() => handlePitClick(index)} disabled={disabled}>
                        <span className="pit-label">{`P1-${index + 1}`}</span>
                        <span className="pit-seeds">{board[index]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mancala-pit mancala-large mancala-bottom">
                <span className="mancala-title">{playerNames.player1}</span>
                <span className="seed-count">{board[player1Mancala]}</span>
              </div>
            </div>
          </div>

          <div className="controls">
            <button className="help-button" onClick={showHelp}>Ajuda</button>
            <button className="ghost-button" onClick={goToStart}>Tela inicial</button>
            <button className="reset-button" onClick={resetGame}>Reiniciar Oware</button>
          </div>
        </>
      )}
    </div>
  );
};

export default OwareGame;