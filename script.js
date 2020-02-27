
/* Future Implementations
Start screen
Glowing or bouncing Next button
Get rid of selection decoration on buttons
Add sticker with sound effect
Color scheme changes every game
*/



const li = document.querySelectorAll("li");
const span = document.querySelector("h3 span");
const button = document.querySelector("button");
const h3 = document.querySelector("h3");
let audio = document.querySelector("#findLetterAudio");

const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let alphabetCopy = [...alphabet];
let shuffledAlphabet;
let contestantLetters;
let newArray;
let thisOne;
let chosenLetter;
let letterAudio;

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
  setAudio();
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
  audio.pause();
  audio.load();
  audio.play();
  audio.removeEventListener('ended', letterSound)
}

function setAudio() {
  audio.src = "./assets/VO/FindTheLetter.mp3";
  audio.addEventListener('ended', letterSound);
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


