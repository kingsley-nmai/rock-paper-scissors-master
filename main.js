// DOM variable
const rulesBtn = document.querySelector(".rules-btn");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-btn");

// show / hide modal starts
rulesBtn.onclick = () => {
  //   console.log("Hello");
  modal.classList.add("show-modal");
};

modal.onclick = () => {
  //   console.log("modal");
  modal.classList.remove("show-modal");
};
closeModalBtn.onclick = () => {
  //   console.log("Close modal");
  modal.classList.remove("show-modal");
};

// window.onload = () => {
//   setTimeout(() => {
//     //   console.log("Hello");
//     // modal.classList.remove("hide-modal");
//   }, 500);
// };

// show / hide modal ends

// game logic starts
const CHOICES = [
  { name: "paper", beats: "rock" },
  { name: "scissors", beats: "paper" },
  { name: "rock", beats: "scissors" },
];

// DOM variables for game logic
const gameDiv = document.querySelector(".game");
const choiceBtns = document.querySelectorAll(".choice-btn");
const resultsDiv = document.querySelector(".results");
const AllresultsDivs = document.querySelectorAll(".results_result");

const resultWinner = document.querySelector(".results_winner");
const resultsText = document.querySelector(".results_text");
const playAgainBtn = document.querySelector(".play-again");
const resultScore = document.querySelector(".score_number");

choiceBtns.forEach((btn) => {
  btn.onclick = () => {
    // console.log(btn.dataset);
    const choiceValue = btn.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceValue);
    // console.log(choice);
    choose(choice);
  };
});

// functions starts
const choose = (choice) => {
  //   console.log(aiChoose());
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
};

const aiChoose = () => {
  const randomValue = Math.floor(Math.random() * CHOICES.length);
  //   console.log(rand);
  return CHOICES[randomValue];
};

const displayResults = (results) => {
  AllresultsDivs.forEach((singleResultDiv, index) => {
    // console.log(index);
    // console.log(results);
    // console.log(singleResultDiv);
    setTimeout(() => {
      singleResultDiv.innerHTML = `<div class="choice ${results[index].name}">
      <img src="./images/icon-${results[index].name}.svg" alt= "${results[index].name}" />
      </div>
      `;
    }, index * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
};

// return a Boolean by comparing the first and second index values of arguments passed
const isWinner = (results) => {
  return results[0].beats === results[1].name;
};

const displayWinner = (results) => {
  setTimeout(() => {
    const userWins = isWinner(results); //compare you choice vs computer choice
    const aiWins = isWinner(results.reverse()); // compare computers choice with your choice
    // console.log(userWins);
    // console.log(aiWins);

    if (userWins) {
      resultsText.innerHTML = "you win";
      AllresultsDivs[0].classList.toggle("winner");
      keepScore(1);
    } else if (aiWins) {
      resultsText.innerHTML = "you lose";
      AllresultsDivs[1].classList.toggle("winner");
      keepScore(-1);
    } else {
      resultsText.innerHTML = "tie";
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
};

// play again
playAgainBtn.onclick = () => {
  // console.log("Hello");
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  AllresultsDivs.forEach((singleResultDiv) => {
    singleResultDiv.innerHTML = "";
    singleResultDiv.classList.remove("winner");
  });

  resultsText.innerHTML = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
};

// score
let defaultScore = 0;
const keepScore = (score) => {
  defaultScore += score;
  console.log(defaultScore);

  resultScore.textContent = defaultScore;
};

// functions ends
// game logic ends
