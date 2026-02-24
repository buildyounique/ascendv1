let player = "";
let hand = [];
let lastPlayed = 0;

// Screens
const join = document.getElementById("joinScreen");
const lobby = document.getElementById("lobby");
const game = document.getElementById("game");
const victory = document.getElementById("victory");

function enterLobby() {
  player = document.getElementById("alias").value || "Player";
  join.classList.add("hidden");
  lobby.classList.remove("hidden");
  document.getElementById("playerName").innerText = player;
}

function startGame() {
  lobby.classList.add("hidden");
  game.classList.remove("hidden");

  // Generate random hand
  hand = Array.from({ length: 10 }, () =>
    Math.floor(Math.random() * 100) + 1
  ).sort((a, b) => a - b);

  renderHand();
}

function renderHand() {
  const handDiv = document.getElementById("hand");
  handDiv.innerHTML = "";

  hand.forEach((num, i) => {
    const card = document.createElement("div");
    card.className = "cardNumber";
    card.innerText = num;
    card.onclick = () => playCard(i);
    handDiv.appendChild(card);
  });
}

function playCard(index) {
  const num = hand[index];

  if (num < lastPlayed) {
    alert("Invalid — must be higher!");
    return;
  }

  lastPlayed = num;
  document.getElementById("playedCard").innerText = num;

  hand.splice(index, 1);
  renderHand();

  if (hand.length === 0) {
    game.classList.add("hidden");
    victory.classList.remove("hidden");
  }
}