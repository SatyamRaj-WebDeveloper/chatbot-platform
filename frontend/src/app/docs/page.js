export default function DocsPage() {
    return (
      <div className="bg-[#050505] min-h-screen text-white p-10 md:p-20">
        <h1 className="text-5xl font-bold mb-10">Documentation & Improvements</h1>
        
        <div className="space-y-12 max-w-4xl">
          <section>
            <h2 className="text-2xl font-bold text-blue-500 mb-4 underline">4 Mandatory Improvements</h2>
            <ul className="space-y-6">
              <li>
                <strong>1. State Persistence:</strong> Uses `localStorage` to save chat history and configurations so data survives page refreshes.
              </li>
              <li>
                <strong>2. Markdown Support:</strong> Integrated `react-markdown` to allow the bot to send formatted technical data and lists.
              </li>
              <li>
                <strong>3. Auto-Scroll Logic:</strong> Implemented `useRef` hooks to ensure the chat window stays locked to the latest message.
              </li>
              <li>
                <strong>4. Global Error Handling:</strong> Added Axios interceptors and try-catch blocks to show "System Offline" states if the backend fails.
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }