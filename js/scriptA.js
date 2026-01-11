const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll(".figure-part");


const palabrasConPistas = {
    "día_de_muertos": " festival mexicano celebra la memoria de los seres queridos que han fallecido, con ofrendas, altares y visitas a los cementerios",
    "jarabe_tapatio": "Es una danza folclórica mexicana originaria del estado de Jalisco, caracterizada por el uso de faldas amplias y sombreros.",
    "teotihuacán": "Es una de las ciudades prehispánicas más importantes de México, conocida por sus imponentes pirámides, como la Pirámide del Sol y la Pirámide de la Luna.",
    "la_huamantlada": "fiesta popular de Tlaxcala que consiste en soltar toros de lidia por las calles y correr frenéticamente delante de ellos.",
    "feria_del_mole": "feria gastronómica que se realiza cada año en el mes de octubre en San Pedro Atocpan, en la Ciudad de México.",
};

const words = Object.keys(palabrasConPistas);

let selectedWord = words[Math.floor(Math.random() * words.length)];
let pista = palabrasConPistas[selectedWord.toLowerCase()];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word
function displayword() {
    wordE1.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
            <span class="letter">
            ${letter === ' ' ? ' ' : correctLetters.includes(letter) ? letter : '_'}
            </span>
            `
            )
            .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord.replace(/ /g, '')) {
        finalMessage.innerText = '¡Felicidades, haz ganado! 🏆';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1() {
    // Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Palabras Incorrectas</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`).join('')}`;

    // Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    // Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = 'Game over';
        popup.style.display = 'flex';
    }
}

// Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key.toLowerCase(); // Convertir a minúsculas

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayword();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else {
                showNotification();
            }
        }
    }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    // Select new word
    selectedWord = words[Math.floor(Math.random() * words.length)];
    pista = palabrasConPistas[selectedWord.toLowerCase()];

    // Display word and update wrong letters
    displayword();
    updateWrongLetterE1();

    // Display hint
    document.querySelector(".textd").innerText = `Pista: ${pista}`;

    // Hide popup
    popup.style.display = 'none';
});

// Initial display of word and hint
displayword();
document.querySelector(".textd").innerText = `Pista: ${pista}`;