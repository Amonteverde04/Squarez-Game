"use strict";

const startMenu = document.querySelector(".menu");
const bckgrnd = document.querySelector("body");
const instructWindow = document.querySelector(".instructionsWindow");
const settingsWindow = document.querySelector(".settingsWindow");

const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const settingsBtn = document.getElementById("settings");
const returnBtn1 = document.getElementById("returnBtn1");
const returnBtn2 = document.getElementById("returnBtn2");
const blckNWhiteBtn = document.getElementById("blckNWhiteMode");
const gridBtn = document.querySelectorAll(".btn");

let menuSelector = 0;
let blckNWhite = false;

const instructionsMenu = function () {
  startMenu.classList.toggle("hidden");
  instructWindow.classList.toggle("hidden");
  menuSelector = 1;
};
const settingsMenu = function () {
  startMenu.classList.toggle("hidden");
  settingsWindow.classList.toggle("hidden");
  menuSelector = 2;
};

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
  console.log(`.menu--${menuSelector}`);
  startMenu.classList.toggle("hidden");
  document.querySelector(`.menu--${menuSelector}`).classList.toggle("hidden");
};

instructionsBtn.addEventListener("click", instructionsMenu);
settingsBtn.addEventListener("click", settingsMenu);
returnBtn1.addEventListener("click", mainMenu);
returnBtn2.addEventListener("click", mainMenu);
blckNWhiteBtn.addEventListener("click", blckNWhiteMode);
