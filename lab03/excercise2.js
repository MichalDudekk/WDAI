const content = document.getElementById("content");

const minLength = document.createElement("input");
minLength.type = "text";
minLength.placeholder = "Min length";

const maxLength = document.createElement("input");
maxLength.type = "text";
maxLength.placeholder = "Max length";

const containCapital = document.createElement("input");
containCapital.type = "checkbox";
const containCapitalLabel = document.createElement("label");
containCapitalLabel.textContent = "Zawiera dużą literę";

const containSpecial = document.createElement("input");
containSpecial.type = "checkbox";
const containSpecialLabel = document.createElement("label");
containSpecialLabel.textContent = "Zawiera znak specjalny";

const submitButton = document.createElement("button");
submitButton.textContent = "Generuj hasło";

content.appendChild(minLength);
content.appendChild(maxLength);
content.appendChild(containCapital);
content.appendChild(containCapitalLabel);
content.appendChild(containSpecial);
content.appendChild(containSpecialLabel);
content.appendChild(submitButton);

const generatePassword = (min, max, hasCapital, hasSpecial) => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const digits = "0123456789";
    const specials = "!@#$%^&*()_+[]{}|;:,.<>?/~`-=";

    min = Math.max(2, min);
    max = Math.max(2, max);

    if (min > max || max <= 0 || (max <= 1 && hasCapital && hasSpecial)) {
        alert("Nieprawidłowe dane");
        return;
    }

    let allChars = lower + digits;
    if (hasCapital) allChars += upper;
    if (hasSpecial) allChars += specials;

    const length = Math.floor(Math.random() * (max - min + 1)) + min;

    const passwordArray = Array(length).fill(null);

    if (hasCapital) {
        const index = Math.floor(Math.random() * length);
        passwordArray[index] = upper[Math.floor(Math.random() * upper.length)];
    }
    if (hasSpecial) {
        let index;
        do {
            index = Math.floor(Math.random() * length);
        } while (passwordArray[index] !== null);
        passwordArray[index] =
            specials[Math.floor(Math.random() * specials.length)];
    }

    passwordArray.forEach((char, index) => {
        if (char === null) {
            passwordArray[index] =
                allChars[Math.floor(Math.random() * allChars.length)];
        }
    });

    return passwordArray.join("");
};

submitButton.addEventListener("click", () => {
    const min = parseInt(minLength.value) || 0;
    const max = parseInt(maxLength.value) || 0;
    const hasCapital = containCapital.checked;
    const hasSpecial = containSpecial.checked;
    let password = generatePassword(min, max, hasCapital, hasSpecial);
    alert(password);
});
