"use strict";

const startMenu = document.querySelector(".menu");
const instructWindow = document.querySelector(".instructionsWindow");
const settingsWindow = document.querySelector(".settingsWindow");

const startBtn = document.getElementById("start");
const instructionsBtn = document.getElementById("instructions");
const settingsBtn = document.getElementById("settings");
const returnBtn1 = document.getElementById("returnBtn1");
const returnBtn2 = document.getElementById("returnBtn2");

let menuSelector = 0;

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

const mainMenu = function () {
  console.log(`.menu--${menuSelector}`);
  startMenu.classList.toggle("hidden");
  document.querySelector(`.menu--${menuSelector}`).classList.toggle("hidden");
};

instructionsBtn.addEventListener("click", instructionsMenu);
settingsBtn.addEventListener("click", settingsMenu);
returnBtn1.addEventListener("click", mainMenu);
returnBtn2.addEventListener("click", mainMenu);
