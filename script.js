

/* Future Implementations
Make elements not interactive after selected
Start screen
Glowing or bouncing Next button
Get rid of selection decoration on buttons
Add sticker with sound effect
Color scheme changes every game
*/


const wrapper = document.querySelector("#wrapper");
const li = document.querySelectorAll("li");
const button = document.querySelector("button");
const h1 = document.querySelector("h1");
let audio = document.querySelector("#findLetterAudio");


const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let alphabetCopy = [...alphabet];
let shuffledAlphabet;
let contestantLetters;
let newArray;
let thisOne;
let chosenLetter;
let letterAudio;

//fix for wiggle scroll on mobile
window.onresize = function() {
  wrapper.style.height = window.innerHeight + "px";
  console.log(window.innerHeight);
}

window.onresize();

newLetters();

//Fisher-Yates Algorithm -- from StackOverflow
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {

    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function newLetters(){
  shuffledAlphabet = shuffle(alphabetCopy);
  contestantLetters = [shuffledAlphabet[0], shuffledAlphabet[1], shuffledAlphabet[2]];
  newArray = contestantLetters;
  removeClasses();
  thisOne = letterSelector(newArray);
  chosenLetter = newArray[thisOne];
  createLetters();
  letterAudio = `./assets/VO/${chosenLetter}.mp3`;
  letterSound();
}

function letterSelector(arr){
  return Math.floor(Math.random() * arr.length);
}

function allNotIt() {
  for(var i = 0; i < newArray.length; i++){
   li[i].classList.add("notIt");
  }
}

function removeClasses(){
  for(let i = 0; i < newArray.length; i++){
    if(li[i].classList.contains("notIt")){
      li[i].classList.remove("notIt");
    }
    if(li[i].classList.contains("it")){
      li[i].classList.remove("it");
    }
   }
}

function letterChecker(event){
    console.log(event.target.tagName);
    if(event.target.innerHTML === chosenLetter) {
    allNotIt();
    event.target.classList.remove("notIt");
    event.target.classList.add("it");
    applause();
  } else {
    event.target.classList.add("notIt");
    incorrect();
  } 
}

function createLetters(){
  for(let i = 0; i < newArray.length; i++) {
    li[i].innerHTML = newArray[i];
    li[i].onclick = letterChecker;
  }
};

function letterSound() {
  audio.src = letterAudio;
}

function applause(){
  audio.src = "./assets/VO/correct answer with clapping.mp3";
  audio.pause();
  audio.load();
  audio.play();
}

function incorrect(){
  audio.src = "./assets/VO/incorrect answer.mp3";
  audio.pause();
  audio.load();
  audio.play();
}

button.onclick = newLetters;