"use strict";

// body, menus and the menu container
const menuContainer = document.querySelector(".menuContainer");
const startMenu = document.querySelector(".menu");
const bckgrnd = document.querySelector("body");
const instructWindow = document.querySelector(".instructionsWindow");
const settingsWindow = document.querySelector(".settingsWindow");
const resetWindow = document.querySelector(".resetWindow");
const scoreWindow = document.querySelector(".scoreWindow");
const scoreHighlight = document.getElementById("scoreTitle");
const scoreTag = document.getElementById("scoreTag");
const timerWindow = document.querySelector(".timerWindow");
const timerHighlight = document.getElementById("timerTitle");
const timerTag = document.getElementById("timerTag");
const difficultyWindow = document.querySelector(".difficultyWindow");
const difficultyHighlight = document.getElementById("difficultyTitle");
const difficultyTag = document.getElementById("difficultyTag");

// all of the buttons
const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const settingsBtn = document.getElementById("settings");
const resetBtn = document.getElementById("reset");
const returnBtn1 = document.getElementById("returnBtn1");
const returnBtn2 = document.getElementById("returnBtn2");
const blckNWhiteBtn = document.getElementById("blckNWhiteMode");
const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const marathonBtn = document.getElementById("marathonBtn");
const gridBtn = document.querySelectorAll(".btn");

// global variables
let menuSelector = 0;
let difficulty = 0;
let blckNWhite = false;
// will hold the old random grid item
let holder;
let score = document.getElementById("scoreTag").textContent;
// timer will be a set time out
let timer;
// time will determine available time in the timer
let time;
// automatically on "easy"
let timeInterval = 500;

// turns instructions menu on and off
const instructionsMenu = function () {
  startMenu.classList.toggle("hidden");
  instructWindow.classList.toggle("hidden");
  menuSelector = 1;
};

// turns settings menu on and off
const settingsMenu = function () {
  startMenu.classList.toggle("hidden");
  settingsWindow.classList.toggle("hidden");
  menuSelector = 2;
};

// makes reset button available on loss
const resetMenu = function () {
  menuContainer.classList.toggle("hidden");
  startMenu.classList.toggle("hidden");
  resetWindow.classList.toggle("hidden");
  menuSelector = 3;
};

// turns main menu back on and hides any other active menu
const mainMenu = function () {
  startMenu.classList.toggle("hidden");
  document.querySelector(`.menu--${menuSelector}`).classList.toggle("hidden");
};

// starts the game
const startGame = function () {
  menuContainer.classList.toggle("hidden");
  scoreWindow.classList.toggle("hidden");
  timerWindow.classList.toggle("hidden");
  difficultyWindow.classList.toggle("hidden");
  if (difficulty === 0) {
    difficultyTag.textContent = `Easy`;
  }
  gameLoop();
};

// timer logic
const setTimer = function () {
  time = 10000;
  timerTag.textContent = `${time / 1000}`;
  timer = setInterval(changeTime, timeInterval);
};

const changeInterval = function () {
  if (Number(score) >= 15 && Number(score) < 20) {
    timeInterval = 250;
  } else if (Number(score) >= 20 && Number(score) < 45) {
    timeInterval = 100;
  } else if (Number(score) >= 45) {
    timeInterval = 50;
  }
};
// every "timeInterval" milliseconds, the timer will update the timer
const changeTime = function () {
  if (time === 0) {
    buttonKill();
  } else {
    time = time - 1000;
    timerTag.textContent = `${time / 1000}`;
  }
};

// loop for game
const gameLoop = function () {
  buttonGen();
  if (difficulty === 3) {
    changeInterval();
  }
  setTimer();
  for (let i = 0; i < 81; i++) {
    if (i === holder) {
      gridBtn[holder].addEventListener("click", buttonSwap);
    } else {
      // mouse hold prevention
      let mouseIsDown = false;
      const preventMouseHold = function () {
        mouseIsDown = true;
        setTimeout(function () {
          if (mouseIsDown) {
            gridBtn[i].click();
          }
        }, 50);
      };
      // prevents bug where player can hold down a grid button
      gridBtn[i].addEventListener("mousedown", preventMouseHold);
      // resets mousedIsDown
      gridBtn[i].addEventListener("mouseup", function () {
        mouseIsDown = false;
      });
      // ends game after wrong click
      gridBtn[i].addEventListener("click", buttonKill);
    }
  }
};

// generates random button to light up and become "active"
const buttonGen = function () {
  let randomSquareSelector = Math.floor(Math.random() * 81);
  while (randomSquareSelector === holder) {
    randomSquareSelector = Math.floor(Math.random() * 81);
  }
  holder = randomSquareSelector;
  gridBtn[holder].classList.toggle("active");
};

// swaps buttons when clicked
const buttonSwap = function () {
  gridBtn[holder].classList.toggle("active");
  score = Number(score) + 1;
  document.getElementById("scoreTag").textContent = score;
  clearInterval(timer);
  resetGrid();
  gameLoop();
};

// stops the game when the wrong button is clicked
const buttonKill = function () {
  resetGrid();
  gridBtn[holder].classList.toggle("active");
  clearInterval(timer);

  let interval = setInterval(frame, 10);
  let i = 0;

  function frame() {
    if (i === 81) {
      clearInterval(interval);
      return;
    } else {
      gridBtn[i].style.backgroundColor = "red";
      i++;
    }
  }
  setTimeout(() => {
    resetMenu();
  }, 1200);
};

// removes the event listeners to prevent event listener interference when switching active button
const resetGrid = function () {
  for (let i = 0; i < 81; i++) {
    if (i === holder) {
      gridBtn[holder].removeEventListener("click", buttonSwap);
    } else {
      gridBtn[i].removeEventListener("click", buttonKill);
    }
  }
};

// resets to main menu
const resetGame = function () {
  const gridButtons = document.getElementsByClassName("btn active");
  let i = 0;
  while (i < gridButtons.length) {
    gridButtons[i].classList.remove("active");
  }
  if (blckNWhite === true) {
    for (let i = 0; i < 81; i++) {
      gridBtn[i].style.backgroundColor = "white";
    }
  }
  if (blckNWhite === false) {
    for (let i = 0; i < 81; i++) {
      gridBtn[i].style.backgroundColor = "black";
    }
  }
  score = 0;
  document.getElementById("scoreTag").textContent = score;
  scoreWindow.classList.toggle("hidden");
  timerWindow.classList.toggle("hidden");
  difficultyWindow.classList.toggle("hidden");
  mainMenu();
};

// black and white setting logic
const blckNWhiteMode = function () {
  if (blckNWhite === false) {
    blckNWhite = true;
    bckgrnd.style.background = "black";
    settingsWindow.style.backgroundColor = "white";
    settingsWindow.style.color = "black";
    instructWindow.style.backgroundColor = "white";
    instructWindow.style.color = "black";
    startMenu.style.backgroundColor = "white";
    startMenu.style.color = "black";
    scoreWindow.style.backgroundColor = "white";
    scoreWindow.style.color = "white";
    scoreHighlight.style.background = "black";
    scoreTag.style.color = "black";
    timerWindow.style.backgroundColor = "white";
    timerWindow.style.color = "white";
    timerHighlight.style.background = "black";
    timerTag.style.color = "black";
    difficultyWindow.style.backgroundColor = "white";
    difficultyWindow.style.color = "white";
    difficultyHighlight.style.background = "black";
    difficultyTag.style.color = "black";
    for (let i = 0; i < 81; i++) {
      gridBtn[i].style.backgroundColor = "white";
    }
  } else {
    blckNWhite = false;
    bckgrnd.style.background = `radial-gradient(
      circle,
      rgba(238, 174, 202, 1) 0%,
      rgba(148, 187, 233, 1) 100%`;
    settingsWindow.style.backgroundColor = "black";
    settingsWindow.style.color = "white";
    instructWindow.style.backgroundColor = "black";
    instructWindow.style.color = "white";
    startMenu.style.backgroundColor = "black";
    startMenu.style.color = "white";
    scoreWindow.style.backgroundColor = "black";
    scoreWindow.style.color = "black";
    scoreHighlight.style.background = "white";
    scoreTag.style.color = "white";
    timerWindow.style.backgroundColor = "black";
    timerWindow.style.color = "black";
    timerHighlight.style.background = "white";
    timerTag.style.color = "white";
    difficultyWindow.style.backgroundColor = "black";
    difficultyWindow.style.color = "black";
    difficultyHighlight.style.background = "white";
    difficultyTag.style.color = "white";
    for (let i = 0; i < 81; i++) {
      gridBtn[i].style.backgroundColor = "black";
    }
  }
};

const difficultyUpdate = function (num) {
  setDifficulty(num);
};

const setDifficulty = function () {
  switch (difficulty) {
    case 0:
      timeInterval = 500;
      difficultyTag.textContent = `Easy`;
      mainMenu();
      console.log(timeInterval);
      break;
    case 1:
      timeInterval = 250;
      difficultyTag.textContent = `Medium`;
      mainMenu();
      console.log(timeInterval);
      break;
    case 2:
      timeInterval = 100;
      difficultyTag.textContent = `Hard`;
      mainMenu();
      console.log(timeInterval);
      break;
    case 3:
      timeInterval = 500;
      difficultyTag.textContent = `Marathon`;
      mainMenu();
      console.log(timeInterval);
      break;
  }
};

instructionsBtn.addEventListener("click", instructionsMenu);
settingsBtn.addEventListener("click", settingsMenu);
returnBtn1.addEventListener("click", mainMenu);
returnBtn2.addEventListener("click", mainMenu);
blckNWhiteBtn.addEventListener("click", blckNWhiteMode);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
easyBtn.addEventListener("click", function () {
  difficulty = 0;
  difficultyUpdate(difficulty);
});
mediumBtn.addEventListener("click", function () {
  difficulty = 1;
  difficultyUpdate(difficulty);
});
hardBtn.addEventListener("click", function () {
  difficulty = 2;
  difficultyUpdate(difficulty);
});
marathonBtn.addEventListener("click", function () {
  difficulty = 3;
  difficultyUpdate(difficulty);
});
