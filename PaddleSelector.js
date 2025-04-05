import { useState } from "react";

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
    options: ["<210 cm", "210–220 cm", ">220 cm"],
  },
];

const resultsMap = {
  Greenland: {
    Carbon: {
      Low: "Ikigai",
      Medium: "Viper",
    },
    Aeroglass: {
      Medium: "Narwhal",
    },
  },
  "Euro blade": {
    Carbon: {
      Low: "Ashika",
      Medium: "Serpent",
      High: "Ultimax",
    },
    Aeroglass: {
      Medium: "Taikiu",
      High: "Ngaru",
    },
  },
};

const paddleData = {
  Ikigai: {
    image: "/ikigai.jpg",
    link: "https://www.seglagear.com/product-page/ikigai",
    description: "A precision-built carbon Greenland paddle for effortless efficiency.",
  },
  Viper: {
    image: "/viper.jpg",
    link: "https://www.seglagear.com/product-page/viper",
    description: "Versatile carbon Greenland paddle for dynamic performance.",
  },
  Narwhal: {
    image: "/narwhal.jpg",
    link: "https://www.seglagear.com/product-page/narwhal",
    description: "Aeroglass Greenland paddle with smooth flexibility and control.",
  },
  Ashika: {
    image: "/ashika.jpg",
    link: "https://www.seglagear.com/product-page/ashika",
    description: "Lightweight Euro blade built for high cadence touring.",
  },
  Serpent: {
    image: "/serpent.jpg",
    link: "https://www.seglagear.com/product-page/serpent",
    description: "Mid-power carbon Euro blade paddle with balance and grip.",
  },
  Ultimax: {
    image: "/ultimax.jpg",
    link: "https://www.seglagear.com/product-page/ultimax",
    description: "High-performance carbon paddle for powerful strokes.",
  },
  Taikiu: {
    image: "/taikiu.jpg",
    link: "https://www.seglagear.com/product-page/taikiu",
    description: "Durable Aeroglass touring blade for all-around use.",
  },
  Ngaru: {
    image: "/ngaru.jpg",
    link: "https://www.seglagear.com/product-page/ngaru",
    description: "High-power Aeroglass Euro blade for maximum propulsion.",
  },
};

export default function PaddleSelector() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (value) => {
    const currentQ = questions[step];
    const newAnswers = { ...answers, [currentQ.question]: value };
    setAnswers(newAnswers);

    if (step === questions.length - 1) {
      const name =
        resultsMap[newAnswers[questions[0].question]]?.[newAnswers[questions[1].question]]?.[
          newAnswers[questions[2].question]
        ];
      setResult(name || "custom");
    } else {
      setStep(step + 1);
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#f4f4f4", borderRadius: "1rem" }}>
      {!result ? (
        <>
          <h2 style={{ fontSize: "20px", marginBottom: "1rem" }}>{questions[step].question}</h2>
          {questions[step].options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt)}
              style={{
                padding: "0.5rem 1rem",
                margin: "0.5rem",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
              }}
            >
              {opt}
            </button>
          ))}
        </>
      ) : result === "custom" ? (
        <>
          <h2>No exact match found</h2>
          <p>Please contact us for a custom recommendation.</p>
          <button onClick={restart} style={{ marginTop: "1rem" }}>
            Start Over
          </button>
        </>
      ) : (
        <>
          <h2>Your Match: {result}</h2>
          <img
            src={paddleData[result].image}
            alt={result}
            style={{ maxWidth: "300px", margin: "1rem 0" }}
          />
          <p>{paddleData[result].description}</p>
          <a href={paddleData[result].link} target="_blank" rel="noopener noreferrer">
            <button style={{ marginTop: "1rem" }}>Shop Now</button>
          </a>
          <div>
            <button onClick={restart} style={{ marginTop: "2rem" }}>
              Try Again
            </button>
          </div>
        </>
      )}
    </div>
  );
                     }
