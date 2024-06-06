import { questions } from "./questions.js";

document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const questionCounterElement = document.getElementById("question-counter");
  const infoElement = document.getElementById("info");
  const nextButton = document.getElementById("next-question");
  const answersButtons = document.querySelectorAll(".answer");

  let correctAnswersCount = 0;
  let currentQuestionIndex = 0;

  function showQuestion(question) {
    questionElement.textContent = question.question;
    infoElement.textContent = "";
    questionCounterElement.textContent = `${currentQuestionIndex + 1}/${
      questions.length
    }`;
    answersButtons.forEach((button, index) => {
      button.className = "answer";
      if (question.options[index]) {
        button.textContent = question.options[index];
        button.style.display = "";
        button.onclick = () =>
          handleAnswer(question.options[index], question.correct);
      } else {
        button.style.display = "none";
      }
    });
  }

  function handleAnswer(selectedOption, correctOption) {
    const isCorrect = selectedOption === correctOption;
    if (isCorrect) {
      correctAnswersCount++;
    }
    answersButtons.forEach((button) => {
      if (button.textContent === correctOption) {
        button.className = "answer correct";
      } else if (button.textContent === selectedOption) {
        button.className = "answer incorrect";
      }
    });
    showInfo(isCorrect, currentQuestionIndex);
    nextButton.textContent =
      currentQuestionIndex < questions.length - 1 ? "Nästa" : "Skicka in";
  }

  function showInfo(isCorrect, questionIndex) {
    const question = questions[questionIndex];
    infoElement.innerHTML = `${isCorrect ? "Rätt svar! " : "Fel svar. "} ${
      question.info
    }`;
  }

  nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(questions[currentQuestionIndex]);
    } else {
      const resultText = `Du hade ${correctAnswersCount} rätt svar av ${questions.length} möjliga.`;
      infoElement.innerHTML = resultText;
      document.querySelector(".question").style.display = "none";
      document.querySelector(".answers").style.display = "none";
      nextButton.style.display = "none";
    }
  });

  showQuestion(questions[currentQuestionIndex]);
});
