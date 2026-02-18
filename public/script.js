let currentLevel = 1;
let consecutiveCorrect = 0;
let totalCorrect = 0;
let totalWrong = 0;

const questions = {
  1: [
    {
      question: "She ___ to school every day.",
      choices: ["go", "goes", "going", "gone"],
      answer: 1
    },
    {
      question: "Choose the synonym of 'happy'.",
      choices: ["Sad", "Joyful", "Angry", "Tired"],
      answer: 1
    },
    {
      question: "Arrange: always / early / she / arrives",
      choices: [
        "She arrives always early",
        "She always arrives early",
        "Always she arrives early",
        "She early arrives always"
      ],
      answer: 1
    }
  ],
  2: [
    {
      question: "Analogy: Cat : Kitten :: Dog : ?",
      choices: ["Cub", "Puppy", "Calf", "Kid"],
      answer: 1
    }
  ]
};

let shuffledQuestions = [];
let currentQuestionIndex = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadLevel() {
  shuffledQuestions = shuffle([...questions[currentLevel]]);
  currentQuestionIndex = 0;
}

function loadQuestion() {
  document.getElementById("level").innerText = "Level: " + currentLevel;

  let q = shuffledQuestions[currentQuestionIndex];

  document.getElementById("question").innerText = q.question;

  let choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach((choice, index) => {
    let btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(index);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  let q = shuffledQuestions[currentQuestionIndex];

  if (selected === q.answer) {
    consecutiveCorrect++;
    totalCorrect++;
    totalWrong = 0;
    document.getElementById("feedback").innerText = "Correct!";
  } else {
    consecutiveCorrect = 0;
    totalWrong++;
    document.getElementById("feedback").innerText = "Wrong!";
  }

  checkLevelChange();
  nextQuestion();
}

function checkLevelChange() {
  if (consecutiveCorrect >= 3 || totalCorrect >= 5) {
    if (questions[currentLevel + 1]) {
      currentLevel++;
      resetCounters();
      loadLevel();
    }
  }

  if (totalWrong >= 3 && currentLevel > 1) {
    currentLevel--;
    resetCounters();
    loadLevel();
  }
}

function resetCounters() {
  consecutiveCorrect = 0;
  totalCorrect = 0;
  totalWrong = 0;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= shuffledQuestions.length) {
    loadLevel();
  }

  loadQuestion();
}

loadLevel();
loadQuestion();
