const element = document.querySelector("#typing-text");

const text = "Artificial Intelligence & Machine Learning Undergrad";
let index = 0;

element.textContent = "";

const typingEffect = setInterval(() => {
    if (index < text.length) {
        element.textContent += text[index];
        index++;
    } else {
        clearInterval(typingEffect);
    }
}, 80);
