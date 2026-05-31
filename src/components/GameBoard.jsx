import React from 'react';
import { player1Pits, player2Pits, player1Mancala, player2Mancala } from '../hooks/useGameEngine';

const GameBoard = ({
  board,
  currentPlayer,
  playerNames,
  gameOver,
  lastMove,
  gameStatus,
  infoMessage,
  isOwnPit,
  handlePitClick,
  showHelp,
  goToStart,
  resetGame,
  resetLabel = 'Reiniciar jogo',
}) => {
  return (
    <>
      <div className="status-box" role="status">
        <div>
          <span className="status-label">Status:</span>
          <span className="status-text">{gameStatus}</span>
        </div>
        <div className="info-box" aria-live="polite">
          {infoMessage}
        </div>
      </div>

      <div className="board-base">
        <div className="board-shell">
          {/* Mancala do Jogador 2 (Topo / Esquerda dependendo do layout) */}
          <div className="mancala-pit mancala-large mancala-top">
            <span className="mancala-title">{playerNames.player2}</span>
            <span className="seed-count">{board[player2Mancala]}</span>
          </div>

          <div className="middle-board">
            {/* Linha do Jogador 2 - Exibida em ordem reversa (direita para a esquerda) */}
            <div className="pit-row top-row">
              {player2Pits.slice().reverse().map((index) => {
                const disabled = !isOwnPit(currentPlayer, index) || board[index] === 0 || gameOver;
                const isLast = lastMove.index === index;
                return (
                  <button
                    key={index}
                    className={`pit ${disabled ? 'pit-disabled' : ''} ${isLast ? 'pit-last-move' : ''}`}
                    onClick={() => handlePitClick(index)}
                    disabled={disabled}
                    aria-label={`Cavidade do Jogador 2, casa ${index - 6}, ${board[index]} sementes`}
                  >
                    <span className="pit-label">{`P2-${index - 6}`}</span>
                    <span className="pit-seeds">{board[index]}</span>
                  </button>
                );
              })}
            </div>

            {/* Linha do Jogador 1 */}
            <div className="pit-row bottom-row">
              {player1Pits.map((index) => {
                const disabled = !isOwnPit(currentPlayer, index) || board[index] === 0 || gameOver;
                const isLast = lastMove.index === index;
                return (
                  <button
                    key={index}
                    className={`pit ${disabled ? 'pit-disabled' : ''} ${isLast ? 'pit-last-move' : ''}`}
                    onClick={() => handlePitClick(index)}
                    disabled={disabled}
                    aria-label={`Cavidade do Jogador 1, casa ${index + 1}, ${board[index]} sementes`}
                  >
                    <span className="pit-label">{`P1-${index + 1}`}</span>
                    <span className="pit-seeds">{board[index]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mancala do Jogador 1 (Base / Direita dependendo do layout) */}
          <div className="mancala-pit mancala-large mancala-bottom">
            <span className="mancala-title">{playerNames.player1}</span>
            <span className="seed-count">{board[player1Mancala]}</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className="help-button" type="button" onClick={showHelp}>
          <span className="button-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
              <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm.25 14.4a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5Zm1.62-5.6c0 .7-.5 1-1.3 1h-.3v.8h-.95v-.9c.5-.1 1-.3 1.3-.7.3-.4.4-.8.4-1.3 0-.9-.6-1.4-1.4-1.4-.7 0-1.3.3-1.6.8l-.9-.5c.4-.8 1.2-1.3 2.6-1.3 1.4 0 2.5.9 2.5 2.3Z" />
            </svg>
          </span>
          Ajuda
        </button>
        <button className="ghost-button" type="button" onClick={goToStart}>
          <span className="button-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </span>
          Tela inicial
        </button>
        <button className="reset-button" type="button" onClick={resetGame}>
          <span className="button-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true" width="18" height="18">
              <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
            </svg>
          </span>
          {resetLabel}
        </button>
      </div>
    </>
  );
};

export default GameBoard;
