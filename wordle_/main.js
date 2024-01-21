/*
const searchedWord = "meise";

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      const guessedLetter = prompt(
        "Bitte gib einen Buchstaben für das Wordle Spiel ein:"
      ).toLowerCase();

      if (searchedWord.includes(guessedLetter)) {
        box.innerText = guessedLetter;
        box.classList.remove("empty", "false");
        box.classList.add("true");
      } else {
        box.innerText = guessedLetter;
        box.classList.remove("empty", "true");
        box.classList.add("false");
      }
    });
  });
});
*/

const searchedWord = "TANNE";

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".box");
  const rows = Array.from({ length: 6 }, (_, rowIndex) =>
    Array.from(boxes).slice(rowIndex * 5, (rowIndex + 1) * 5)
  );

  function checkRowsComplete() {
    for (const row of rows) {
      const greenCount = row.filter((box) =>
        box.classList.contains("true")
      ).length;
      const yellowCount = row.filter((box) =>
        box.classList.contains("available")
      ).length;

      if (greenCount + yellowCount === 5) {
        const lastGreenIndex = row.findIndex((box) =>
          box.classList.contains("true")
        );
        const lastGreenBox = row[lastGreenIndex + 4];

        if (
          lastGreenBox.innerText.trim().toUpperCase() !== "" &&
          lastGreenBox.innerText.trim().toUpperCase().length === 1
        ) {
          setTimeout(() => {
            alert("Super, du hast gewonnen!");
          }, 100);

          return true;
        }
      }
    }
    return false;
  }

  const guessedLetters = new Set();

  boxes.forEach((box, index) => {
    box.addEventListener("input", () => {
      const guessedLetter = box.innerText.trim().toUpperCase().charAt(0);

      if (/[A-Z]/.test(guessedLetter)) {
        guessedLetters.add(guessedLetter);

        if (searchedWord.includes(guessedLetter)) {
          const correctPositions = searchedWord
            .split("")
            .map(
              (letter, i) =>
                guessedLetters.has(letter.toUpperCase()) && i % 5 === index % 5
            );

          if (correctPositions.includes(true)) {
            box.classList.remove("false", "available");
            box.classList.add("true");
          } else {
            box.classList.remove("true", "false");
            box.classList.add("available");
          }
        } else {
          box.classList.remove("true", "available");
          box.classList.add("false");
        }

        const nextBox = boxes[index + 1];
        if (nextBox) {
          nextBox.focus();
        }

        if (checkRowsComplete()) {
          return;
        }
      } else {
        box.innerText = "";
      }
    });

    /* ---Backspace löschen on ---

    box.addEventListener("keydown", (event) => {
      if (event.key === "Backspace") {
        guessedLetters.delete(box.innerText.trim().toUpperCase());

        const prevBox = boxes[index - 1];
        if (prevBox) {
          prevBox.innerText = "";
          prevBox.classList.remove("true", "false", "available");
          prevBox.focus();
        }
      }
    });

    */
  });
});
