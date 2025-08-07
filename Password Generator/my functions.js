export function determinePasswordStrength(passwordDisplay, strengthDisplay, firstStrengthBar, secondStrengthBar, thirdStrengthBar, fourthStrengthBar){
    const theLength = passwordDisplay.value.length;
    const regExUpper = /^[A-Z]+$/;
    const regExLower = /^[a-z]+$/;
    const regExNumbers = /^[0-9]+$/;
    const regExSymbols = /^[!@#$%^&*]+$/;
    const regExUpperNumbers = /^[A-Z0-9]+$/; 
    const regExLowerNumbers = /^[a-z0-9]$/;
    const regExUpperLower = /^[A-Z]+$/i;
    const regExUpperLowerNumbers = /^[A-Z0-9]$/i;
    const regExUpperLowerSymbols = /^[A-Z!@#$%^&*]$/i;
    const regExLowerNumbersSymbols = /^[a-z0-9!@#$%^&*]$/;
    const regExUpperNumbersSymbols = /^[A-Z0-9!@#$%^&*]$/;
    if(passwordDisplay.value.match(regExUpper)||
       passwordDisplay.value.match(regExLower)||
       passwordDisplay.value.match(regExNumbers)||
       passwordDisplay.value.match(regExSymbols)||
       theLength < 8
    ){
        strengthDisplay.textContent = "LOW"; 
        firstStrengthBar.style.backgroundColor = "red";
        firstStrengthBar.style.border = "red";
        secondStrengthBar.style.backgroundColor = "black";
        secondStrengthBar.style.border = "1px solid white";
        thirdStrengthBar.style.backgroundColor = "black";
        thirdStrengthBar.style.border = "1px solid white";
        fourthStrengthBar.style.backgroundColor = "black";
        fourthStrengthBar.style.border = "1px solid white";
    }
    else if(passwordDisplay.value.match(regExUpperNumbers)||
            passwordDisplay.value.match(regExLowerNumbers)||
            passwordDisplay.value.match(regExUpperLower)||
            (theLength >= 8 && theLength < 12)
    ){
        strengthDisplay.textContent = "MEDIUM";
        firstStrengthBar.style.backgroundColor = "orange";
        firstStrengthBar.style.border = "orange";
        secondStrengthBar.style.backgroundColor = "orange";
        secondStrengthBar.style.border = "orange";
        thirdStrengthBar.style.backgroundColor = "orange";
        thirdStrengthBar.style.border = "orange";
        fourthStrengthBar.style.backgroundColor = "black";
        fourthStrengthBar.style.border = "1px solid white";
    }else if(passwordDisplay.value.match(regExUpperLowerNumbers)||
             passwordDisplay.value.match(regExUpperLowerSymbols)||
             passwordDisplay.value.match(regExLowerNumbersSymbols)||
             passwordDisplay.value.match(regExUpperNumbersSymbols)||
             theLength >= 12
    ){
        strengthDisplay.textContent = "HIGH";
        firstStrengthBar.style.backgroundColor = "green";
        firstStrengthBar.style.border = "green";
        secondStrengthBar.style.backgroundColor = "green";
        secondStrengthBar.style.border = "green";
        thirdStrengthBar.style.backgroundColor = "green";
        thirdStrengthBar.style.border = "green";
        fourthStrengthBar.style.backgroundColor = "green";
        fourthStrengthBar.style.border = "green";
    }else{
        strengthDisplay.textContent = "";
    }
}

const myTemplate = document.getElementById('tooltip');
const TooltipTemp = myTemplate.content.cloneNode(true); 
const Tooltip = TooltipTemp.querySelector('p');
const checkedCircle = TooltipTemp.querySelector('i')
export async function copyToClipboard(text){
    if(!text){
        console.log('Aucun texte à copier');  
        return; 
    }
   try{
     await navigator.clipboard.writeText(text);
     document.body.append(Tooltip, checkedCircle);
     Tooltip.textContent = "Copied!";
     Tooltip.style.opacity = 1;
     Tooltip.style.color = "aqua";
     checkedCircle.style.color = "green";
     console.log('Texte copié avec succès');
     setTimeout(() => {
        Tooltip.style.opacity = 0;
        checkedCircle.style.opacity = 0;
     }, 1000);
    }catch(err){
    console.log('Erreur de copie');
    }
}