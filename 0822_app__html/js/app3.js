document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1R0LhXTrtGN0MndrpleN6FcwyE9agvr0cOlPs3vk-UII/values/A:F/?key=AIzaSyA_b_Vlfqx2G9r6rseF-GHXwAtQaxQyXP0';
    const arabicWordElement = document.getElementById('arabic-word');
    const optionButtons = document.querySelectorAll('.option-btn');
    const historyButton = document.getElementById('history-btn');

    let words = [];
    let currentWord = {};
    let incorrectHistory = localStorage.getItem("incorrectHistory")
        ? JSON.parse(localStorage.getItem("incorrectHistory"))
        : [];


    async function fetchWords() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            words = data.values.map(row => ({
                arabic: row[0],
                correct: row[1],
                incorrect1: row[2],
                incorrect2: row[3]
            }));
            loadNextWord();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function loadNextWord() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        arabicWordElement.textContent = currentWord.arabic;

        const options = shuffle([currentWord.correct, currentWord.incorrect1, currentWord.incorrect2]);

        optionButtons.forEach((button, index) => {
            button.textContent = options[index];
            button.className = 'option-btn';
            button.onclick = () => checkAnswer(button, options[index]);
        });
    }

    function checkAnswer(button, selectedAnswer) {
        if (selectedAnswer === currentWord.correct) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
            incorrectHistory.push({
                arabic: currentWord.arabic,
                correct: currentWord.correct,
                selected: selectedAnswer
            });
            localStorage.setItem('incorrectHistory', JSON.stringify(incorrectHistory));
        }

        setTimeout(loadNextWord, 1000);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    historyButton.onclick = () => {
        window.location.href = 'history.html';
    };

    fetchWords();
});
