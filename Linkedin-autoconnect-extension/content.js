let isStopped = false; // To track the start/stop state

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'start_connecting') {
    isStopped = false;
    connectAllProfiles();
  } else if (message.action === 'stop_connecting') {
    isStopped = true;
  }
});

function connectAllProfiles() {
  const connectButtons = Array.from(document.querySelectorAll('button.artdeco-button'));
  const connectableButtons = connectButtons.filter(button => button.innerText.trim() === 'Connect');

  console.log(`Found ${connectableButtons.length} connect buttons.`);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const sendRequests = async () => {
    for (let button of connectableButtons) {
      if (isStopped) {
        console.log('Stopped connecting.');
        return;
      }
      button.click();
      console.log('Clicked a connect button');
      await delay(2000); // 2 seconds between each request
    }
    alert(`Sent ${connectableButtons.length} connection requests!`);
  };

  sendRequests();
}
