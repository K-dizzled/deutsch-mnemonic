document.addEventListener("DOMContentLoaded", function () {
    const wordList = document.getElementById('wordList');
    const searchInput = document.getElementById('search');

    function displayWords(words) {
        wordList.innerHTML = '';
        words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.innerHTML = `
                <div class="word">${word.word}</div>
                <div class="translation">${word.translation}</div>
                <div class="description">${word.description}</div>
            `;
            wordList.appendChild(wordItem);
        });
    }

    function filterWords(words, query) {
        return words.filter(word => {
            const lowerQuery = query.toLowerCase();
            return word.word.toLowerCase().includes(lowerQuery) ||
                   word.translation.toLowerCase().includes(lowerQuery) ||
                   word.description.toLowerCase().includes(lowerQuery);
        });
    }

    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            displayWords(data);

            searchInput.addEventListener('input', () => {
                const filteredWords = filterWords(data, searchInput.value);
                displayWords(filteredWords);
            });
        })
        .catch(error => console.error('Error fetching words:', error));
});
