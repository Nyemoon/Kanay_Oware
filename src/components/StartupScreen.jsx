import React from 'react';

const StartupScreen = ({
  title,
  subtitle,
  rules,
  playerInputs,
  handleInputChange,
  startGame,
  idPrefix,
}) => {
  const p1Id = `${idPrefix}-player1`;
  const p2Id = `${idPrefix}-player2`;

  return (
    <div className="startup-screen">
      <div className="startup-card">
        <h2>{title}</h2>
        <p className="subtitle">{subtitle}</p>

        <div className="input-group">
          <label htmlFor={p1Id}>Seu nome</label>
          <input
            id={p1Id}
            type="text"
            value={playerInputs.player1}
            placeholder="Jogador 1"
            onChange={(e) => handleInputChange('player1', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor={p2Id}>Nome do adversário</label>
          <input
            id={p2Id}
            type="text"
            value={playerInputs.player2}
            placeholder="Jogador 2"
            onChange={(e) => handleInputChange('player2', e.target.value)}
          />
        </div>

        <div className="rules-panel">
          <h3>Regras principais</h3>
          <ul className="rules-list">
            {rules.map((rule, idx) => (
              <li key={idx}>{rule}</li>
            ))}
          </ul>
        </div>

        <button className="start-button" onClick={startGame}>
          Começar partida
        </button>
      </div>
    </div>
  );
};

export default StartupScreen;
