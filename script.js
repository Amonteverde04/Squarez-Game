"use strict";

// body, menus and the menu container
const menuContainer = document.querySelector(".menuContainer");
const startMenu = document.querySelector(".menu");
const bckgrnd = document.querySelector("body");
const instructWindow = document.querySelector(".instructionsWindow");
const settingsWindow = document.querySelector(".settingsWindow");
const resetWindow = document.querySelector(".resetWindow");

// all of the buttons
const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const settingsBtn = document.getElementById("settings");
const resetBtn = document.getElementById("reset");
const returnBtn1 = document.getElementById("returnBtn1");
const returnBtn2 = document.getElementById("returnBtn2");
const blckNWhiteBtn = document.getElementById("blckNWhiteMode");
const gridBtn = document.querySelectorAll(".btn");

// global variables
let menuSelector = 0;
let blckNWhite = false;
// will hold the old random grid item
let holder;

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

// generates random button to light up and become "active"
const buttonGen = function () {
  let randomSquareSelector = Math.floor(Math.random() * 81);
  while (randomSquareSelector === holder) {
    randomSquareSelector = Math.floor(Math.random() * 81);
  }
  holder = randomSquareSelector;
  gridBtn[holder].classList.toggle("active");
};

// starts the game
const startGame = function () {
  menuContainer.classList.toggle("hidden");
  gameLoop();
};

// loop for game
const gameLoop = function () {
  buttonGen();
  for (let i = 0; i < 81; i++) {
    console.log(`Button ${i}: ${gridBtn[i].textContent}`);
    if (i === holder) {
      gridBtn[holder].addEventListener("click", buttonSwap);
    } else {
      gridBtn[i].addEventListener("click", buttonKill);
    }
  }
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
  mainMenu();
};

const buttonKill = function () {
  resetGrid();
  gridBtn[holder].classList.toggle("active");

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

// swaps buttons when clicked
const buttonSwap = function () {
  gridBtn[holder].classList.toggle("active");
  resetGrid();
  gameLoop();
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
    for (let i = 0; i < 81; i++) {
      gridBtn[i].style.backgroundColor = "black";
    }
  }
};

instructionsBtn.addEventListener("click", instructionsMenu);
settingsBtn.addEventListener("click", settingsMenu);
returnBtn1.addEventListener("click", mainMenu);
returnBtn2.addEventListener("click", mainMenu);
blckNWhiteBtn.addEventListener("click", blckNWhiteMode);
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
