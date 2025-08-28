import React, { useState, useEffect } from "react";

const symbols = ['🍒', '🍋', '🔔', '🍎', '🍉'];
const probabilities = [0.6, 0.1, 0.1, 0.1, 0.1];

const getRandomSymbol = () => {
  const randomValue = Math.random();
  let sum = 0;
  for (let i = 0; i < symbols.length; i++) {
    sum += probabilities[i];
    if (randomValue < sum) return symbols[i];
  }
  return symbols[symbols.length - 1];
};

const Slot = ({ symbol }) => {
  return (
    <div
      style={{
        width: "150px",
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #333",
        margin: "0 15px",
        fontSize: "3em",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        transition: "all 0.1s ease-in-out",
      }}
    >
      {symbol}
    </div>
  );
};

const SlotMachine = () => {
  const [result, setResult] = useState(["", "", ""]);
  const [message, setMessage] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setMessage("");

    let intervalCount = 0;

    const intervalId = setInterval(() => {
      const newResult = Array.from({ length: 3 }, () => getRandomSymbol());
      setResult(newResult);
      intervalCount += 1;

      if (intervalCount >= 10) {
        clearInterval(intervalId);
        finalizeSpin();
      }
    }, 100);
  };

  const finalizeSpin = () => {
    const finalResult = Array.from({ length: 3 }, () => getRandomSymbol());
    setResult(finalResult);
    checkJackpot(finalResult);
    setIsSpinning(false);
  };

  const checkJackpot = (spinResult) => {
    if (spinResult[0] === spinResult[1] && spinResult[1] === spinResult[2]) {
      setMessage("🎉 잭팟! 🎉");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>슬롯머신</h1>
      <button
        onClick={spin}
        style={{
          padding: "15px 30px",
          fontSize: "1.2em",
          cursor: isSpinning ? "not-allowed" : "pointer",
          backgroundColor: isSpinning ? "#ccc" : "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          transition: "background-color 0.3s ease",
        }}
        disabled={isSpinning}
      >
        {isSpinning ? "슬롯 돌리는 중..." : "슬롯 돌리기"}
      </button>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        {result.map((symbol, index) => (
          <Slot key={index} symbol={symbol} />
        ))}
      </div>

      {message && (
        <div style={{ marginTop: "30px", fontSize: "5em", color: "red", fontWeight: "bold" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default SlotMachine;