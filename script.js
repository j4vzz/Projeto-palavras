document.addEventListener('DOMContentLoaded', () => {
    const textForm = document.getElementById('textForm');
    const textArea = document.getElementById('textArea');
    const mostCommonWordsDiv = document.getElementById('mostCommonWords');
    const sortedWordContactDiv = document.getElementById('sortedWordContact');
    const showDataStructuresBtn = document.getElementById('showDataStructures');
    const stringExampleSpan = document.getElementById('stringExample');
    const arrayExampleSpan = document.getElementById('arrayExample');
    const objectExampleSpan = document.getElementById('objectExample');

    textForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const text = textArea.value.toLowerCase(); // Converte para minúsculas para análise consistente
        if (text.trim() === '') {
            alert('Por favor, digite algum texto para analisar.');
            return;
        }

        // --- Manipulação de textos para mostrar as principais palavras ---
        const words = text.match(/\b\w+\b/g) || []; // Extrai palavras usando regex
        const wordCount = {};

        // Conta a ocorrência de cada palavra
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });

        // Converte o objeto de contagem em um array de pares [palavra, contagem]
        const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]); // Ordena por contagem (maior para menor)

        // Limpa resultados anteriores
        mostCommonWordsDiv.innerHTML = '';
        sortedWordContactDiv.innerHTML = '';

        // Exibe as 10 palavras mais comuns
        const topWords = sortedWords.slice(0, 10);
        if (topWords.length > 0) {
            topWords.forEach(([word, count]) => {
                const wordItem = document.createElement('span');
                wordItem.classList.add('word-item');
                wordItem.textContent = `${word} (${count})`;
                mostCommonWordsDiv.appendChild(wordItem);
            });
        } else {
            mostCommonWordsDiv.textContent = 'Nenhuma palavra encontrada.';
        }

        // --- Analisar e ordenar um contato de palavras com JavaScript ---
        // Ordena todas as palavras em ordem alfabética
        const allWordsSortedAlphabetically = words.sort();
        if (allWordsSortedAlphabetically.length > 0) {
            allWordsSortedAlphabetically.forEach(word => {
                const wordItem = document.createElement('span');
                wordItem.classList.add('word-item');
                wordItem.textContent = word;
                sortedWordContactDiv.appendChild(wordItem);
            });
        } else {
            sortedWordContactDiv.textContent = 'Nenhuma palavra para ordenar.';
        }

        // Armazena temporariamente os dados para o exemplo de estruturas de dados
        localStorage.setItem('stringData', text);
        localStorage.setItem('arrayData', JSON.stringify(words.slice(0, 5))); // Exemplo com as 5 primeiras palavras
        localStorage.setItem('objectData', JSON.stringify(Object.fromEntries(sortedWords.slice(0, 3)))); // Exemplo com 3 palavras e suas contagens
    });

    // --- Aprender a diferenciar estruturas de dados ---
    showDataStructuresBtn.addEventListener('click', () => {
        const stringData = localStorage.getItem('stringData') || 'N/A';
        const arrayData = localStorage.parse(localStorage.getItem('arrayData')) || [];
        const objectData = JSON.parse(localStorage.getItem('objectData')) || {};

        stringExampleSpan.textContent = `"${stringData.substring(0, 50)}..." (Um texto longo é uma String)`;
        arrayExampleSpan.textContent = `[${arrayData.join(', ')}] (Uma lista de itens é um Array)`;
        objectExampleSpan.textContent = `{${Object.entries(objectData).map(([key, value]) => `"${key}": ${value}`).join(', ')}} (Pares de chave-valor são um Objeto)`;
    });
});