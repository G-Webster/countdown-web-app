console.log('options script loaded');

//html elements
//selectors have been identified in script.js

//initial selected value: since i want it to be added once, i will add it at the beginning
let selectedValue;


function populateHoursOptions() {
for (let i = 1; i <= 59; i++) {
    //add content to the option element
    // option element
let optionElement = document.createElement(`option`) //when declared outside loop, it only runs once/ creates on element

optionElement.innerText = i < 10 ? `0` + i : i;

//add attribute/s
optionElement.setAttribute('value', i);

    //apend child
hoursSelector.appendChild(optionElement);


}
}

function populateMinutesOptions() {
    for (let i = 1; i <= 59; i++) {
        //add content to the option element
        // option element
    let optionElement = document.createElement(`option`) //when declared outside loop, it only runs once/ creates on element
    
    optionElement.innerText = i < 10 ? `0` + i : i;
    
    //add attribute/s
    optionElement.setAttribute('value', i);
    
        //apend child
    minutesSelector.appendChild(optionElement);

    }
    }

    function populateSecondsOptions() {
        for (let i = 1; i <= 59; i++) {
            //add content to the option element
            // option element
            
        let optionElement = document.createElement(`option`) //when declared outside loop, it only runs once/ creates on element
        
        optionElement.innerText = i < 10 ? `0` + i : i;
        
        //add attribute/s
        optionElement.setAttribute('value', i);
            //apend child
        secondsSelector.appendChild(optionElement);

        }
        }

populateHoursOptions();
populateMinutesOptions();
populateSecondsOptions();
