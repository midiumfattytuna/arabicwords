document.addEventListener('DOMContentLoaded', () => {
    const historyContainer = document.getElementById('history-container');
    const backButton = document.getElementById('back-btn');

    const incorrectHistory = JSON.parse(localStorage.getItem('incorrectHistory')) || [];

    if (incorrectHistory.length === 0) {
        historyContainer.innerHTML = '<p>No incorrect answers recorded.</p>';
    } else {
        incorrectHistory.forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.classList.add('history-entry');
            entryElement.innerHTML = `
                <p><strong>Arabic:</strong> ${entry.arabic}</p>
                <p><strong>Correct:</strong> ${entry.correct}</p>
                <p><strong>Your Answer:</strong> ${entry.selected}</p>
            `;
            historyContainer.prepend(entryElement);
        });
    }

    backButton.onclick = () => {
        window.location.href = 'index3.html';
    };
});
