const gameElements = [
  { name: "rock", emoji: "✊" },
  { name: "paper", emoji: "✋" },
  { name: "scissors", emoji: "✌️" },
];

const gameScore = {
  player: 0,
  computer: 0,
};

let rounds = 0;

function playerSelection() {
  document.querySelectorAll(".buttons").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selection = gameElements.filter(
        (element) => element.name === e.target.dataset.gameElement
      );
      checkRounds(selection[0], computerSelection());
    });
  });
}

function computerSelection() {
  return gameElements[Math.floor(Math.random() * gameElements.length)];
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function playRound(playerSelection, computerSelection) {
  rounds++;
  if (playerSelection.name === computerSelection.name) return "Draw!";
  if (playerSelection.name === "paper" && computerSelection.name === "rock") {
    gameScore.player++;
    return "You win! Paper beats Rock";
  }
  if (
    playerSelection.name === "scissors" &&
    computerSelection.name === "paper"
  ) {
    gameScore.player++;
    return "You win! Scissors beats Paper";
  }
  if (
    playerSelection.name === "rock" &&
    computerSelection.name === "scissors"
  ) {
    gameScore.player++;
    return "You win! Rock beats Scissors";
  } else {
    gameScore.computer++;
    return `You lose! ${capitalize(computerSelection.name)} beats ${capitalize(
      playerSelection.name
    )}`;
  }
}

function showRound(playerSelection, computerSelection) {
  const game = document.querySelector(".game");
  const round = document.createElement("div");
  round.innerHTML = `
    <div class="game__player">${playerSelection.emoji}</div>
    <div class="game__computer">${computerSelection.emoji}</div>
    `;
  round.classList.add("game__round", `game__round--${rounds}`);
  game.appendChild(round);

  getCurrentScore();
}

function getCurrentScore() {
  const playerScore = document.querySelector(".score__player");
  const computerScore = document.querySelector(".score__computer");

  playerScore.textContent = gameScore.player;
  computerScore.textContent = gameScore.computer;
}

function checkRounds(playerSelection, computerSelection) {
  if (rounds < 5) {
    const player = playerSelection;
    const computer = computerSelection;

    const result = playRound(player, computer);
    showRound(player, computer);

    showRoundResult(result);
  } else {
    showFinalResult();
  }
}

function showRoundResult(result) {
  const modal = document.querySelector(".round-modal");
  modal.children[0].textContent = result;

  setTimeout(() => {
    modal.classList.toggle("disabled");
  }, 700);
  modal.classList.toggle("disabled");
}

function showFinalResult() {
  const modal = document.querySelector(".final-modal");
  modal.children[0].textContent = getWinner();

  modal.classList.remove("disabled");
}

function getWinner() {
  if (gameScore.player > gameScore.computer) return "You win!";
  if (gameScore.player === gameScore.computer) return "Draw!";
  else return "You lose!";
}

function reset() {
  const button = document.querySelector(".final-modal__button");
  const modal = document.querySelector(".final-modal");
  const game = document.querySelector(".game");
  const playerScore = document.querySelector(".score__player");
  const computerScore = document.querySelector(".score__computer");

  button.addEventListener("click", () => {
    modal.classList.add("disabled");
    rounds = 0;
    gameScore.player = 0;
    gameScore.computer = 0;
    game.innerHTML = "";
    playerScore.textContent = 0;
    computerScore.textContent = 0;
  });
}

playerSelection();
reset();
