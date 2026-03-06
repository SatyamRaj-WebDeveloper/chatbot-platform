(function() {
    // Get the bot ID from the script tag attribute
    const scriptTag = document.currentScript;
    const botId = scriptTag.getAttribute('data-id');
    
    // Create the iframe container
    const iframe = document.createElement('iframe');
    
    // Point this to your Vercel deployment URL
    const baseUrl = window.location.origin; 
    iframe.src = `${baseUrl}/embed?id=${botId}`;
    
    // Styling the iframe to be a fixed bubble
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '400px';
    iframe.style.height = '600px';
    iframe.style.border = 'none';
    iframe.style.zIndex = '999999';
    iframe.style.colorScheme = 'none';
    
    document.body.appendChild(iframe);
  })();