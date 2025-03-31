console.log('The script is loaded');

//get all html elements we need
const startCounterBtn = document.getElementById('startCounterBtn');
const pauseCounterBtn = document.getElementById('pauseCounterBtn');
const resumeCounterBtn = document.getElementById('resumeCounterBtn');
const resetCounterBtn = document.getElementById('resetCounterBtn');

const counterValue = document.getElementById('counter');
const messageContainer = document.getElementById('msg');

const hoursSelector = document.getElementById('hoursSelector');
const minutesSelector = document.getElementById('minutesSelector');
const secondsSelector = document.getElementById('secondsSelector');

//input values are initialised so we can update them when a user selects
let hoursInput;
let minutesInput;
let secondsInput;

//dynamic values
let formattedCounter;
let counter;
let prevCounterValue; //for resuming when paused
let secCounter = secondsInput ? secondsInput : 60;
let message = '';

//counter states for pausing, restarting
let pauseCounter = false; // initial idea but did not;
let delayTimeMs = 1000; // will be used to pause by increasing or reducing the number of delay in loop

//initially render the counter value and hide the message container
counterValue.innerText = counter ? counter : `⌚`;
messageContainer.style.display = 'none';

//click events to the buttons

startCounterBtn.addEventListener('click', startCountdown);
pauseCounterBtn.addEventListener('click', pauseCountdown);
resumeCounterBtn.addEventListener('click', resumeCountdown);
resetCounterBtn.addEventListener('click', resetCountdown);


//get hours input

 hoursSelector.addEventListener('change', function () {
        console.log('HoursInput: ', this.value);
        hoursInput = this.value;
 })

 //get minutes input

 minutesSelector.addEventListener('change', function () {
    console.log('MinutesInput: ', this.value);
    minutesInput = this.value;
})

//get seconds input

secondsSelector.addEventListener('change', function () {
    console.log('SecondsInput: ', this.value);
    secondsInput = this.value;
})



//function that combines hours, minutes, seconds into seconds and returns value
//so i can use it in loop
function getSumOfSeconds(hours = 0, minutes = 0, seconds = 0) {
// Problem: when some values are undefined or 0, no sum is returned
// Solution: the parameters are given value of 0

        let hourToSec = hours * 3600; // 60m * 60 = 3600s
        let minuteToSec = minutes * 60; // 1m * 60 = 60s
        let secondsOnly = seconds * 1; // if i just use seconds, somehow i get a 0 added to it

        console.log('seconds: ', secondsOnly);

        // seconds remains the same

        let sum = hourToSec + minuteToSec + secondsOnly;
        console.log('sum of seconds: ', sum);
        return sum;
 }




//delay function that i'll put in the loop to pause after iteration
function delayLoopIteration() {

    return new Promise((resolve) => {

     setTimeout(()=> {
        resolve();
     }, delayTimeMs)

    })
}

// function that updates the counter after 1 second and displays in UI
async function startCountdown() {
    
    console.log('starting countdown');
    
    //we need to update the counter here since a user has provided inputs
counter = prevCounterValue ? prevCounterValue : getSumOfSeconds(hoursInput, minutesInput, secondsInput);
console.log('counter value: ', counter);

//hide the msg box initially
messageContainer.style.display = 'none';

//hide start button
startCounterBtn.style.display = 'none';
//show pause button
pauseCounterBtn.style.display = 'block';
//show reset button
resetCounterBtn.style.display = 'block';

if (counter) {
     //a loop to automate the process
while(counter >= 0) {
    console.log(counter);
        
    //logic that formats the display of counter, when more than 1 min and more than an hour

         // dynamic minutes
         let dynamicMinutes = counter / 60;
          // dynamic hours
          let dynamicHours = counter / 3600;
          //seconds counter
          secCounter;
          secCounter -= 1; // decrease by 1. somehow this just decreases once and while the loop goes on it does not
          if(secCounter == 1) {
            //reset sec counter
            secCounter = 59;
          }

          //i noticed as seconds changed, some decimals are shown so i researched and i found this 
          //converts a number to whole, well its main use is to convert strings to numbers
          dynamicMinutes = parseInt(dynamicMinutes);
          dynamicHours = parseInt(dynamicHours); 
            
        switch (true) {
            // if less than 60s or equal
            case counter  <= 59:
               formattedCounter = counter;
               break;
           // if more than 60s
            case counter > 59:
           
               formattedCounter = `${dynamicMinutes} : ${secCounter}`;
               break;
           // if more than or equal 1 hour
           case counter >= 3600:
             
               formattedCounter = `${dynamicHours} : ${dynamicMinutes} : ${secCounter}`;
               break;
               default:
              formattedCounter = counter; 
        }

        console.log(formattedCounter);

        counterValue.innerText = formattedCounter;
        //if countdown is 0, show a message box
        if(counter === 0) {
            message = "Congratutions, countdown has finished!";
            messageContainer.style.display = 'block';
            messageContainer.innerText = message; 
        }

        await delayLoopIteration();
      
     counter--
}  
} 
}

//features 
 function pauseCountdown() {

    console.log('pausing countdown');
    delayTimeMs = 31536000000; //one year lol. (a user will have logged out by then am sure)
    //hide pause button
    pauseCounterBtn.style.display = 'none';
    //show resume button
    resumeCounterBtn.style.display = 'block';
 }

 function resumeCountdown() {
  
//show pause button
pauseCounterBtn.style.display = 'block';
//hide resume button
resumeCounterBtn.style.display = 'none';

    console.log('resuming countdown');
    delayTimeMs = 1000; // 1 second
    prevCounterValue = counter; // update previous value
    startCountdown();
    
 }

 function resetCountdown() {

    //hide reset button
resetCounterBtn.style.display = 'none';
//hide resume button
resumeCounterBtn.style.display = 'none';
//show start button
startCounterBtn.style.display = 'block';
   
    console.log('resetting countdown');
    delayTimeMs = 1000; // 1 second
    prevCounterValue = 0; // set previous value
    counter = 0; // set previous value
    counterValue.innerText = `⌚`;
   // startCountdown();
    
 }



//NOTES:
/*
# seems like using setTimeout function in the loop does not 
work because the loop just runs without pausing. or maybe it does(not smart enough to do it lol)
# after research, i found that i had to use async function for loop and Promise object for
the delay logic to work in the loop iteration
#basically, we await for a Promise to be resolved here
*/

