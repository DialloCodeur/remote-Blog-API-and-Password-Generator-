import {determinePasswordStrength, copyToClipboard} from "./my functions.js";

const passwordLengthDisplay = document.querySelector('#password-length-display');
const adjustPasswordLength = document.querySelector('#adjust-password-length');
export let passwordDisplay = document.getElementById('password-display');
const generateButton = document.querySelector('.generate-button');
const includeUppercaseLetters = document.getElementById('include-uppercase-letters');
const includeLowercaseLetters = document.getElementById('include-lowercase-letters');
const includeNumbers = document.getElementById('include-numbers');
const includeSymbols = document.getElementById('include-symbols');
const strengthDisplay = document.querySelector('.strength-display');
const firstStrengthBar = document.querySelector('.div1');
const secondStrengthBar = document.querySelector('.div2');
const thirdStrengthBar = document.querySelector('.div3');
const fourthStrengthBar = document.querySelector('.div4');

passwordLengthDisplay.textContent = adjustPasswordLength.value;
adjustPasswordLength.addEventListener('input', (event) => {
    passwordLengthDisplay.textContent = event.target.value;
});
generateButton.addEventListener('click', () => {
    const myArray = new Uint8Array(parseInt(passwordLengthDisplay.textContent)); //Crée un tableau de taille choisie par l'utilisateur qui ne peut contenir que des valeurs entre 0 et 255
    crypto.getRandomValues(myArray); // Rempli aléatoiremnt myArray avec des valeurs entre 0 et 255
    const chars = {
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        lower: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789" ,
        symbols: "!@#$%^&*"
    };
    let temporaryPassword = "";
    if(includeUppercaseLetters.checked){
        temporaryPassword += chars.upper; 
    }
    if(includeLowercaseLetters.checked){
        temporaryPassword += chars.lower;
    }
    if(includeNumbers.checked){
        temporaryPassword += chars.numbers;
    }
    if(includeSymbols.checked){  
        temporaryPassword += chars.symbols; 
    }
    if(temporaryPassword === ""){
        alert("Select at least one character type")
        return;
    }
    const finalPassword = Array.from(myArray, byte => temporaryPassword[byte % temporaryPassword.length]).join("");
    passwordDisplay.value = finalPassword;
    determinePasswordStrength(passwordDisplay, strengthDisplay, firstStrengthBar, secondStrengthBar, thirdStrengthBar, fourthStrengthBar);
});

export const copyButton = document.querySelector('.copy-btn');
copyButton.addEventListener('click', () => {
    copyToClipboard(passwordDisplay.value);
});

const switchOnDarkMode = document.getElementById('switch-on-dark-mode');
switchOnDarkMode.addEventListener('change', () => {
    if(switchOnDarkMode.checked){
    document.body.style.backgroundColor = "black"
    }else{
        document.body.style.backgroundColor = "white";
    }
})
