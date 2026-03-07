(function() {
  const scriptTag = document.currentScript;
  const botId = scriptTag.getAttribute('data-id');
  
  // REMOVED THE TRAILING SLASH HERE
  const PLATFORM_URL = "https://chatbot-platform-jade.vercel.app"; 
  
  const iframe = document.createElement('iframe');
  iframe.src = `${PLATFORM_URL}/embed?id=${botId}`;
  
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.width = '80px';
  iframe.style.height = '80px';
  iframe.style.border = 'none';
  iframe.style.zIndex = '999999';
  iframe.style.transition = 'all 0.3s ease';
  
  document.body.appendChild(iframe);

  window.addEventListener('message', (event) => {
    // SECURITY CHECK: Matches both local and production
    const allowedOrigins = [
      "http://localhost:3000",
      PLATFORM_URL
    ];
  
    if (!allowedOrigins.includes(event.origin)) return;

    if (event.data === 'expand_chatbot') {
        // Standard expansion size
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