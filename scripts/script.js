console.log('The script is loaded');

//get all html elements we need
const startCounterBtn = document.getElementById('startCounterBtn');
const pauseCounterBtn = document.getElementById('pauseCounterBtn');
const resumeCounterBtn = document.getElementById('resumeCounterBtn');
const resetCounterBtn = document.getElementById('resetCounterBtn');

const counterValue = document.getElementById('counter');
const successMessageContainer = document.getElementById('successMsg');
const warningMessageContainer = document.getElementById('warningMsg');


const hoursSelector = document.getElementById('hoursSelector');
const minutesSelector = document.getElementById('minutesSelector');
const secondsSelector = document.getElementById('secondsSelector');

const progressBarContainer = document.getElementById('progressBarContainer');

//input values are initialised so we can update them when a user selects
let hoursInput;
let minutesInput;
let secondsInput;

//dynamic values
let formattedCounter;
let counter;
let fixedCounterValue;
let prevCounterValue; //for resuming when paused

let secCounter = secondsInput ? secondsInput : 59;
let minCounter = minutesInput ? minutesInput : 59;
let minuteTracker = minutesInput ? minutesInput : 59; //for minute tracking when hours are selected
let message = '';

//counter states for pausing, restarting
let pauseCounter = false; // initial idea but did not;
let delayTimeMs = 1000; // will be used to pause by increasing or reducing the number of delay in loop

//initially render the counter value and hide the message container
counterValue.innerText = counter ? counter : `⌚`;
successMessageContainer.style.display = 'none';
warningMessageContainer.style.display = 'none';

//progress bar
let progressBarElement = document.createElement('div');

//click events to the buttons

startCounterBtn.addEventListener('click', startCountdown);
pauseCounterBtn.addEventListener('click', pauseCountdown);
resumeCounterBtn.addEventListener('click', resumeCountdown);
resetCounterBtn.addEventListener('click', resetCountdown);

//disable start button if counter is empty: to-do


//get hours input

 hoursSelector.addEventListener('change', function () {
        console.log('HoursInput: ', this.value);
        hoursInput = this.value;
 })

 //get minutes input

 minutesSelector.addEventListener('change', function () {
    console.log('MinutesInput: ', this.value);
    minutesInput = this.value;
    minuteTracker = this.value;
    minCounter = this.value;
})

//get seconds input

secondsSelector.addEventListener('change', function () {
    console.log('SecondsInput: ', this.value);
    secondsInput = this.value;
    secCounter = this.value;
})


//function that combines hours, minutes, seconds into seconds and returns value
//so i can use it in loop
function getSumOfSeconds(hours = 0, minutes = 0, seconds = 0) {
// Problem: when some values are undefined or 0, no sum is returned
// Solution: the parameters are given value of 0

        let hourToSec = hours * 3600; // 60m * 60 = 3600s
        let minuteToSec = minutes * 60; // 1m * 60 = 60s
        let secondsOnly = seconds * 1; // if i just use seconds, somehow i get a 0 added to it

        //console.log('seconds: ', secondsOnly);

        // seconds remains the same

        let sum = hourToSec + minuteToSec + secondsOnly;
        //console.log('sum of seconds: ', sum);
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


function displayWarningMsg(message) {
  setTimeout(() => {
    warningMessageContainer.style.display = 'block';
    warningMessageContainer.innerText = message;
  }, 2000)
  setTimeout(() => {
    warningMessageContainer.style.display = 'none';
  }, 5000)
 
}

// function that updates the counter after 1 second and displays in UI
async function startCountdown() {

    
    console.log('starting countdown');
    
    
    //we need to update the counter here since a user has provided inputs
counter = prevCounterValue ? prevCounterValue : getSumOfSeconds(hoursInput, minutesInput, secondsInput);

fixedCounterValue = getSumOfSeconds(hoursInput, minutesInput, secondsInput); // for progress to not be disturbed
console.log('counter value: ', counter);


  //if no counter is provided, alert user and stop execution
  if(!counter) {
    displayWarningMsg('Please provide the time count!');
    return;
    }

//hide the msg boxes initially
successMessageContainer.style.display = 'none';


//hide start button
startCounterBtn.style.display = 'none';
//show pause button
pauseCounterBtn.style.display = 'block';
//show reset button
resetCounterBtn.style.display = 'block';

if (counter) {
     //a loop to automate the process
while(counter >= 0) {
   // console.log(counter);
        
    //logic that formats the display of counter, when more than 1 min and more than an hour

         // dynamic minutes
         let dynamicMinutes = counter / 60;
        
          // dynamic hours
          let dynamicHours = counter / 3600;

         


        

          //i noticed as seconds changed, some decimals are shown so i researched and i found this 
          //converts a number to whole, well its main use is to convert strings to numbers
          dynamicMinutes = parseInt(dynamicMinutes);
          dynamicHours = parseInt(dynamicHours); 
            
        if (counter  < 60) {
             // if less than 60s or equal
             formattedCounter = counter < 10 ? '0' + counter : counter;
        } else if (counter < 3600) {
            // if more than 60s    
            formattedCounter = `${dynamicMinutes < 10 ? '0' + dynamicMinutes : dynamicMinutes} : ${secCounter < 10 ? '0' + secCounter : secCounter}`;
        } else {
             // if more than or equal 1 hour
             formattedCounter = `${dynamicHours < 10 ? '0' + dynamicHours : dynamicHours} : ${minCounter < 10 ? '0' + minCounter : minCounter} : ${secCounter < 10 ? '0' + secCounter : secCounter}`;
        }

         //minutes if hours are set
          //we track minutes first and start decreasing by 1
          minuteTracker -= 1; //decrease it by 1
         // console.log('minute tracker: ', minuteTracker)
          
          // decrease by 1 every 60s/minute
         if (minuteTracker == -1) {
            minCounter -= 1;  
           }

          if(minCounter == -1) {
            //reset minutes counter
            minCounter = 59;
          }

          if(minuteTracker == -1) {
            //reset minute tracker
            minuteTracker = 59;
          }

          //seconds counter
          secCounter -= 1; // decrease by 1
          if(secCounter == -1) {
            //reset sec counter
            secCounter = 59;
          }
   

       // console.log(formattedCounter);

        counterValue.innerText = formattedCounter;
        //if countdown is 0, show a message box
        if(counter === 0) {
            counterValue.innerText = `✔️`;
            counterValue.style.background = '#fff';
            message = "Congratutions, task done!";
            successMessageContainer.style.display = 'block';
            successMessageContainer.innerText = message; 
            //hide reset button
            resetCounterBtn.style.display = 'none';
            //hide resume button
            resumeCounterBtn.style.display = 'none';
            //hide pause button
            pauseCounterBtn.style.display = 'none';
            //show start button
            startCounterBtn.style.display = 'block';
        }
        startCountingProgress();
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
//hide pause button
pauseCounterBtn.style.display = 'none';
//show start button
startCounterBtn.style.display = 'block';

//remove progress
//progressBarContainer.removeChild(progressBarElement);
counterValue.style.background = '#fff';


    console.log('resetting countdown');
    delayTimeMs = 1000; // 1 second
    prevCounterValue = 0; // set previous value
    counter = 0; // set previous value
    counterValue.innerText = `⌚`;
   // startCountdown();
   
    
 }

//  show progress bar

/* basic math/logic:
 we need a total of count value in seconds(100%), then while
 it decreases, we decrease the percentage by current value
 */
 let startPercentage; //for progress


 /*
 this function takes total amount of counter 
 that the user selects initially(initialValue) 
 and current value of counter as the counter is 
 running (currentValue) then we use this to determine
 the percentage that has decreased from 100 as the
 timer runs
 */
function findCurrentPercentage(initialValue, currentValue) {
 
  let percentageValue;

  percentageValue = (currentValue * 100) / initialValue;

  return percentageValue;
}



function startCountingProgress() {
  //  console.log('initialCount: ', fixedCounterValue);
  //  console.log('currentCount: ', counter);

   startPercentage = findCurrentPercentage(parseInt(fixedCounterValue), parseInt(counter))
   console.log('progress %: ', startPercentage);

//populate the div: DEPRECATED: this logic was used for testing the progress logic

// progressBarElement.setAttribute('style',
//   `border-top: 2px red solid; width: ${startPercentage}%;`)
// progressBarContainer.appendChild(progressBarElement);

//update: we now use rounded circle
counterValue.style.background = `conic-gradient(#eee ${startPercentage}% 0%, #a3c3f7 0% 100%)`;

 
}





//NOTES:
/*
# seems like using setTimeout function in the loop does not 
work because the loop just runs without pausing. or maybe it does(not smart enough to do it lol)
# after research, i found that i had to use async function for loop and Promise object for
the delay logic to work in the loop iteration
#basically, we await for a Promise to be resolved here
*/

