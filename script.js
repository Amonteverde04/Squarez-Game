"use strict";

// body, menus and the menu container
const menuContainer = document.querySelector(".menuContainer");
const startMenu = document.querySelector(".menu");
const bckgrnd = document.querySelector("body");
const instructWindow = document.querySelector(".instructionsWindow");
const settingsWindow = document.querySelector(".settingsWindow");

// all of the buttons
const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const settingsBtn = document.getElementById("settings");
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

// generates random button to light up and become "active"
const buttonGen = function () {
  let randomSquareSelector = Math.floor(Math.random() * 82);
  holder = randomSquareSelector;
  gridBtn[randomSquareSelector].classList.toggle("active");
};

// starts the game
const game = function () {
  menuContainer.classList.toggle("hidden");
  buttonGen();
};

// resets all the tiles
const reset = function () {
  const gridButtons = document.getElementsByClassName("btn active");
  let i = 0;
  while (i < gridButtons.length) {
    gridButtons[i].classList.remove("active");
  }
};

// swaps buttons when clicked
const buttonSwap = function () {
  gridBtn[holder].classList.toggle("active");
  let randomSquareSelector = Math.floor(Math.random() * 82);
  while (randomSquareSelector === holder) {
    randomSquareSelector = Math.floor(Math.random() * 82);
  }
  holder = randomSquareSelector;
  gridBtn[randomSquareSelector].classList.toggle("active");
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

const mainMenu = function () {
  startMenu.classList.toggle("hidden");
  document.querySelector(`.menu--${menuSelector}`).classList.toggle("hidden");
};

instructionsBtn.addEventListener("click", instructionsMenu);
settingsBtn.addEventListener("click", settingsMenu);
returnBtn1.addEventListener("click", mainMenu);
returnBtn2.addEventListener("click", mainMenu);
blckNWhiteBtn.addEventListener("click", blckNWhiteMode);
startBtn.addEventListener("click", game);

for (let i = 0; i < 81; i++) {
  gridBtn[i].addEventListener("click", buttonSwap);
}
