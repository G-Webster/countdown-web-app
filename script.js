console.log('The script is loaded');

//get all html elements we need
const startCounterBtn = document.getElementById('startCounterBtn');
const counterValue = document.getElementById('counter');
const messageContainer = document.getElementById('msg');

//dynamic values
let counter = 10;
let message = '';

//initially render the counter value and hide the message container
counterValue.innerText = counter;
messageContainer.style.display = 'none';

//add a click event to the button
startCounterBtn.addEventListener('click', startCountdown);

//delay function that i'll put in the loop to pause after iteration
function delayLoopIteration() {

    return new Promise((resolve) => {

     setTimeout(()=> {
        resolve();
     }, 1000)

    })
}

// function that updates the counter after 1 second and displays in UI
async function startCountdown() {
    //  if (counter < 0) return;
     //a loop to automate the process
while(counter >= 0) {
    console.log(counter);
    
    
        counterValue.innerText = counter;
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

//NOTES:
/*
# seems like using setTimeout function in the loop does not 
work because the loop just runs without pausing. or maybe it does(not smart enough to do it lol)
# after research, i found that i had to use async function for loop and Promise object for
the delay logic to work in the loop iteration
#basically, we await for a Promise to be resolved here
*/

