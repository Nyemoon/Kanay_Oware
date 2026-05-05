# 🎮 Mancala Game

Um jogo de Mancala implementado em React com design moderno e tema dark, inspirado na sabedoria africana sobre semeadura e colheita.

> "De origem africana e com ricas variações, o Mancala nos ensina que a vida é um fascinante exercício de semeadura. Mais do que um jogo, é uma lição sobre como cultivar e distribuir nossos recursos e essência para que, ao final do ciclo, possamos colher os melhores frutos."

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior)
- **npm** (geralmente vem com o Node.js)

### Verificando as versões instaladas:

```bash
node --version
npm --version
```

## 🚀 Instalação e Execução

### 1. Clone ou baixe o projeto

Se você clonou o repositório:

```bash
git clone <url-do-repositorio>
cd mancala-game
```

Ou simplesmente navegue até a pasta do projeto.

### 2. Instale as dependências

```bash
npm install
```

Este comando instalará todas as dependências necessárias, incluindo:
- React
- Vite (bundler/build tool)
- Outras dependências do projeto

### 3. Execute o projeto em modo desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado e você verá algo como:

```
Vite v5.4.21  ready in XXXX ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.X.X:5173/
➜  press h + enter to show help
```

### 4. Abra no navegador

Acesse `http://localhost:5173/` no seu navegador para jogar!

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Visualizar build de produção localmente:

```bash
npm run preview
```

## 🎯 Como Jogar Mancala

### Regras Básicas:

1. **Configuração Inicial**: 12 casas começam com 4 sementes cada; os Mancalas (depósitos grandes) começam vazios.

2. **Objetivo**: Capturar mais sementes que o adversário.

3. **Como Jogar**:
   - Clique em uma casa do seu lado para semear anti-horário
   - Pule o Mancala do adversário durante a distribuição
   - Se a última semente cair em uma casa vazia do seu lado, capture também as sementes opostas

4. **Fim do Jogo**: Quando um lado fica sem sementes, o outro jogador coleta o restante.

### Interface do Jogo:

- **Mancalas**: Depósitos grandes nos lados esquerdo (P2) e direito (P1)
- **Casas**: 6 casas por jogador com sementes para distribuir
- **Status**: Informações sobre o turno atual e ações realizadas
- **Controles**: Botões para ajuda, reiniciar e voltar à tela inicial

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework JavaScript para interfaces
- **Vite** - Build tool e servidor de desenvolvimento rápido
- **CSS3** - Estilização com variáveis CSS, Grid, Flexbox
- **JavaScript ES6+** - Lógica do jogo e interatividade

### Recursos Visuais:

- **Tema Dark** com tons de terracota e ouro
- **Glassmorphism** - Efeitos de vidro translúcido
- **Responsividade** - Funciona em desktop, tablet e mobile
- **Animações** - Transições suaves e efeitos visuais

## 📁 Estrutura do Projeto

```
mancala-game/
├── public/
│   └── LogoMancala.jpg          # Logo/imagem do jogo
├── src/
│   ├── App.jsx                  # Componente principal
│   ├── main.jsx                 # Ponto de entrada da aplicação
│   ├── MancalaGame.jsx          # Componente principal do jogo
│   └── MancalaGame.css          # Estilos do jogo
├── index.html                   # HTML principal
├── package.json                 # Dependências e scripts
├── vite.config.js               # Configuração do Vite
└── README.md                    # Este arquivo
```

## 🎨 Personalização

### Cores do Tema

O jogo utiliza variáveis CSS para facilitar a personalização:

```css
:root {
  --color-terracotta: #B35A38;
  --color-ochre: #D49137;
  --color-cream: #F5F5DC;
  --color-indigo: #1A2B4C;
  --color-emerald: #2E7D32;
  --color-ebony: #121212;
  --color-night: #0b1220;
  --color-dusk: #162243;
}
```

### Fontes

O projeto utiliza Google Fonts:
- **Inter** (sans-serif) - Para textos gerais
- **Josefin Sans** (display) - Para títulos

## 🐛 Solução de Problemas

### Erro: "npm start" não funciona

Use `npm run dev` em vez de `npm start`. O script correto está definido no `package.json`.

### Erro: Porta 5173 ocupada

O Vite escolherá automaticamente outra porta disponível, ou você pode especificar uma porta:

```bash
npm run dev -- --port 3000
```

### Erro de build

Certifique-se de que todas as dependências estão instaladas:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Jogo não carrega no navegador

1. Verifique se o servidor está rodando
2. Limpe o cache do navegador (Ctrl+F5)
3. Verifique se não há erros no console do navegador (F12)

## 📝 Scripts Disponíveis

```bash
npm run dev      # Inicia servidor de desenvolvimento
npm run build    # Cria build para produção
npm run preview  # Visualiza build de produção localmente
```

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades!

## 📄 Licença

Este projeto está licenciado sob a **MIT License** - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

A Licença MIT é uma licença permissiva que permite:
- Uso comercial
- Modificação
- Distribuição
- Uso privado
- Sublicenciamento

Com a condição de manter o aviso de copyright e a permissão nos arquivos redistribuídos.

---

**Divirta-se jogando Mancala! 🌱**</content>
<parameter name="filePath">/home/ketlyn/Desktop/React/Kanai/README.md