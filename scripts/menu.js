console.log('menu script loaded');
//html elements
const reloadBtn = document.getElementById('reloadBtn');
const shareBtn = document.getElementById('shareBtn');

//reloading logic
reloadBtn.addEventListener('click', () => {
    console.log('Reloading');
    window.location.reload();
})

//sharing logic
//got this from https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share
const shareData = {
    title: "Countdown web app",
    text: "Lets get that task in motion!",
    url: "https://g-webster.github.io/countdown-web-app/",
  };
  
// Share must be triggered by "user activation"
shareBtn.addEventListener("click", async () => {
    try {
      await navigator.share(shareData);
      console.log("Web app shared successfully");
    } catch (err) {
       console.log(`Error: ${err}`);
    }
  });