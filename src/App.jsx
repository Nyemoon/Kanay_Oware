import React, { useState } from 'react';
import MancalaGame from './MancalaGame';
import OwareGame from './Oware'; 
import './App.css';

const App = () => {
  const [activeGame, setActiveGame] = useState(null);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="app-shell">
      {!activeGame ? (
        <div className="menu-container">
          <div className="menu-header">
            <h1 className="menu-title">Jogos de Mancala</h1>
            <p className="menu-tagline">Uma jornada ancestral através de estratégia e sabedoria</p>
          </div>

          <div className="menu-content">
            <p className="menu-intro">
              Bem-vindo ao fascinante mundo do Mancala, um dos jogos de tabuleiro mais antigos da humanidade. 
              Explore diferentes variações deste clássico africano e asiático, cada uma com suas próprias 
              estratégias e encantamentos.
            </p>

            <div className="menu-divider"></div>
          
            <div className="menu-options">
              <button className="menu-button kalah-btn" onClick={() => setActiveGame('mancala')}>
                <span className="btn-title">Kalah</span>
                <small className="btn-region">Variante Ocidental</small>
                <p className="btn-description">Estratégia focada em turnos extras e capturas diretas. Perfeito para iniciantes que querem aprender os fundamentos.</p>
                <span className="btn-cta">Jogar Kalah →</span>
              </button>
              
              <button className="menu-button oware-btn" onClick={() => setActiveGame('oware')}>
                <span className="btn-title">Oware</span>
                <small className="btn-region">Variante Africana Tradicional</small>
                <p className="btn-description">Captura em cascata com profundo cálculo estratégico. Desafie sua mente com jogadas complexas e antecipação.</p>
                <span className="btn-cta">Desafiar Oware →</span>
              </button>
            </div>

            <div className="menu-footer">
              <button 
                className="about-button" 
                onClick={() => setShowAbout(!showAbout)}
              >
                {showAbout ? '✕ Fechar' : 'ℹ Sobre o Mancala'}
              </button>
              
              {showAbout && (
                <div className="about-panel">
                  <h3>A Herança do Mancala</h3>
                  <p>
                    Mancala é mais que um jogo. É uma tradição milenar que atravessa continentes, 
                    conectando gerações através da estratégia, matemática e sabedoria ancestral.
                  </p>
                  <p>
                    De origem africana e com variações pelo mundo árabe e asiático, o Mancala 
                    representa a arte de cultivar recursos e antecipar movimentos futuros — 
                    princípios universais que transcendem o tempo e o espaço.
                  </p>
                  <p>
                    Cada variação oferece uma perspectiva única sobre como pensamos, planejamos 
                    e competimos com elegância e respeito.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="game-wrapper">
          <button className="back-button" onClick={() => setActiveGame(null)}>
            ← Voltar ao Menu
          </button>
          
          {activeGame === 'mancala' && <MancalaGame />}
          {activeGame === 'oware' && <OwareGame />}
        </div>
      )}
    </div>
  );
};

export default App;