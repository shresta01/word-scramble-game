import React, { useState } from "react";
import wordsList from "./words.json"; 
import "./App.css"; 

function App() {
  const [originalWord, setOriginalWord] = useState("");
  const [maskedWord, setMaskedWord] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const maxAttempts = 6;

  const getNewWord = () => {
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setOriginalWord(randomWord);
    setMaskedWord("_ ".repeat(randomWord.length).trim()); 
    setWrongGuesses(0);
    setGameOver(false);
    setUserGuess("");
  };

const checkGuess = () => {
  if (!userGuess || gameOver) return; // Ignore empty guesses or if game is over

  let newMasked = maskedWord.split(" ");
  let correct = false;

  // Check if guessed letter matches any letter in the word
  originalWord.split("").forEach((letter, index) => {
    if (userGuess.toLowerCase() === letter.toLowerCase()) {
      newMasked[index] = letter;
      correct = true;
    }
  });

  setMaskedWord(newMasked.join(" "));

  // ✅ If the full word is guessed, show success prompt & update score
  if (newMasked.join("") === originalWord) {
    setTimeout(() => {
      alert(`🎉 Correct! The word was '${originalWord}'. Moving to the next word...`);
      setScore(prev => prev + 1); // 🔥 Increase score
      getNewWord(); // Start next round
    }, 500);
    return; // Stop further execution after correct guess
  }

  // ❌ If the guess was wrong, update attempts & show failure message if max attempts reached
  if (!correct) {
    setWrongGuesses(prev => prev + 1);

    if (wrongGuesses + 1 === maxAttempts) {
      setGameOver(true);
      setMaskedWord(originalWord.split("").join(" ")); // Reveal correct word

      setTimeout(() => {
        alert(`❌ Sorry, incorrect guess! The correct word was: "${originalWord}".`);
      }, 500); // Show  failure message
    }
  }

  setUserGuess(""); 
};



  return (
  <div className="game-container">
    <h1>Hangman</h1>
    <p className="scrambled-word">{gameOver ? `Game Over! The word was: ${originalWord}` : maskedWord || "Click 'New Word' to start!"}</p>

    {/* Hangman Drawing */}
    <div className="hangman">
      <div className={`base ${wrongGuesses >= 1 ? "show" : ""}`}></div>
      <div className={`stand ${wrongGuesses >= 2 ? "show" : ""}`}></div>
      <div className={`rope ${wrongGuesses >= 3 ? "show" : ""}`}></div>
      <div className={`head ${wrongGuesses >= 4 ? "show" : ""}`}></div>
      <div className={`body ${wrongGuesses >= 5 ? "show" : ""}`}></div>
      <div className={`legs ${wrongGuesses >= 6 ? "show" : ""}`}></div>
    </div>

    <input 
  type="text" 
  placeholder="Enter a letter"
  maxLength="1"
  value={userGuess}
  onChange={(e) => setUserGuess(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") checkGuess(); 
  }}
  disabled={gameOver}
/>

    <button onClick={checkGuess} disabled={gameOver}>Check Letter</button>
    <button onClick={getNewWord}>New Word</button>

    {/* ✅ Add Score Display Here */}
    <p className="score">Score: {score}</p> 
    <p className="attempts">Attempts left: {Math.max(0, maxAttempts - wrongGuesses)}</p>
  </div>
);

}

export default App;
