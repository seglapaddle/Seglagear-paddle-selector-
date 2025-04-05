import React, { useState } from "react";

const questions = [
  {
    id: 1,
    question: "What type of paddle are you looking for?",
    options: ["Greenland", "Euro blade"],
  },
  {
    id: 2,
    question: "Preferred material?",
    options: ["Carbon", "Aeroglass"],
  },
  {
    id: 3,
    question: "Blade size or power preference?",
    options: ["Low", "Medium", "High"],
  },
  {
    id: 4,
    question: "Paddle length range?",
    options: ["<210 cm", "210-220 cm", "220-230 cm"],
  },
];

const resultsMap = {
  Greenland: {
    Carbon: "Ikigai",
    Aeroglass: "Narwhal",
  },
  "Euro blade": {
    Carbon: {
      Low: "Ngaru",
      Medium: "Ultimax",
      High: "Serpent",
    },
    Aeroglass: {
      Low: "Ashika",
      Medium: "Taikiu",
      High: "Viper",
    },
  },
};

const PaddleSelector = () => {
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("");

  const handleOptionSelect = (option) => {
    const currentQuestion = questions[step];
    const updatedAnswers = { ...answers, [currentQuestion.id]: option };
    setAnswers(updatedAnswers);

    if (step === questions.length - 1) {
      const type = updatedAnswers[1];
      const material = updatedAnswers[2];
      const size = updatedAnswers[3];

      let recommended = "";
      if (type === "Greenland") {
        recommended = resultsMap[type][material];
      } else {
        recommended = resultsMap[type][material][size];
      }

      setResult(recommended);
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
    setResult("");
  };

  if (result) {
    return (
      <div>
        <h2>Your ideal paddle: {result}</h2>
        <img
          src={`/${result.toLowerCase()}.jpg`}
          alt={result}
          width="300"
        />
        <br />
        <button onClick={restart}>Start Over</button>
      </div>
    );
  }

  const currentQuestion = questions[step];

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option) => (
        <button key={option} onClick={() => handleOptionSelect(option)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default PaddleSelector;
