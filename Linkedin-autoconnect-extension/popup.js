let isRunning = false; // A flag to control the start/stop functionality

document.getElementById('startBtn').addEventListener('click', () => {
  if (isRunning) return; // Prevent multiple starts
  isRunning = true;

  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;

  // Send a message to start the connection process
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    if (currentTab.url.startsWith("https://www.linkedin.com/mynetwork/grow/")) {
      chrome.tabs.sendMessage(currentTab.id, { action: 'start_connecting' });
    } else {
      alert('Please open the Grow Network page on LinkedIn.');
    }
  });
});

document.getElementById('stopBtn').addEventListener('click', () => {
  if (!isRunning) return;
  isRunning = false;

  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;

  // Send a message to stop the connection process
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    chrome.tabs.sendMessage(currentTab.id, { action: 'stop_connecting' });
  });
});
