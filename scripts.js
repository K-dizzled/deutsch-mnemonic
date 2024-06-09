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
                ${word.examples ? `<div class="examples"><strong>Examples:</strong><ul>${word.examples.map(example => `<li class="example-item">${example}</li>`).join('')}</ul></div>` : ''}
            `;
            wordList.appendChild(wordItem);
        });
    }

    function filterWords(words, query) {
        return words.filter(word => {
            const lowerQuery = query.toLowerCase();
            return word.word.toLowerCase().includes(lowerQuery) ||
                   word.translation.toLowerCase().includes(lowerQuery) ||
                   word.description.toLowerCase().includes(lowerQuery) ||
                   (word.examples && word.examples.some(example => example.toLowerCase().includes(lowerQuery)));
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
