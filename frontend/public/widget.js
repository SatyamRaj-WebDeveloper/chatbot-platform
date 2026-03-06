(function() {
  const scriptTag = document.currentScript;
  const botId = scriptTag.getAttribute('data-id');
  
  // Change this to your actual production URL (e.g., https://your-app.vercel.app)
  const PLATFORM_URL = "https://chatbot-platform-henna.vercel.app"; 
  
  const iframe = document.createElement('iframe');
  iframe.src = `${PLATFORM_URL}/embed?id=${botId}`;
  
  // 1. Initial Styles: Small bubble size
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '80px';   // Small bubble size initially
  iframe.style.height = '80px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '999999';
  iframe.style.transition = 'all 0.3s ease'; // Smooth expansion
  
  document.body.appendChild(iframe);

  // 2. Communication: Listen for "expand" or "close" events from the iframe
  window.addEventListener('message', (event) => {
    // Only accept messages from your platform
    if (event.origin !== PLATFORM_URL) return;
    if (event.data === 'expand_chatbot') {
      // Reduce from 400px to 360px for a cleaner look
      iframe.style.width = '360px'; 
      // Use a smaller height and ensure it doesn't hide the bottom taskbar
      iframe.style.height = 'min(550px, 85vh)'; 
      iframe.style.bottom = '10px';
      iframe.style.right = '10px';
  }

    if (event.data === 'expand_chatbot') {
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.bottom = '20px';
        iframe.style.right = '20px';
    } else if (event.data === 'minimize_chatbot') {
        iframe.style.width = '80px';
        iframe.style.height = '80px';
    }
});
})();