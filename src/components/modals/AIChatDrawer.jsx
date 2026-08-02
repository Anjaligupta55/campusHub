import React from 'react';

export default function AIChatDrawer({
  aiChatOpen,
  setAiChatOpen,
  aiMessages,
  setAiMessages,
  aiInput,
  setAiInput
}) {
  return (
    <div className={`ai-assistant-widget ${aiChatOpen ? 'expanded' : ''}`}>
      {aiChatOpen ? (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <h4>🧠 CampusHub AI Assistant</h4>
            <button className="ai-chat-close-btn" onClick={() => setAiChatOpen(false)}>×</button>
          </div>
          <div className="ai-chat-body">
            {aiMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <form className="ai-chat-footer" onSubmit={(e) => {
            e.preventDefault();
            if (!aiInput.trim()) return;
            const userMsg = aiInput;
            setAiMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
            setAiInput('');
            
            setTimeout(() => {
              const query = userMsg.toLowerCase();
              let reply = '';
              if (query.includes('exam kit') || query.includes('exam')) {
                reply = 'I recommend the "Semester Exam Prep Kit" (₹1499) which contains registers, pens, and a calculator. It is located in the Combos & Offers tab.';
              } else if (query.includes('hostel') || query.includes('room')) {
                reply = 'For hostel setups, check the Dorm Store / Hostel category or our Freshers Starter Kit in the Combos page which includes a bucket, mug, hangers, sheet and lock for ₹999.';
              } else if (query.includes('500') || query.includes('cheap')) {
                reply = 'Items under ₹500: Trimax Pens (₹250), LED Study Lamps (₹399), Plastic Buckets (₹249), Coffee Mugs (₹150), and Chemistry Lab Coats (₹150 on second-hand marketplace).';
              } else if (query.includes('laptop') || query.includes('accessories')) {
                reply = 'We have Laptop stands (₹799), Wireless Mouse (₹299), mechanical keyboards (₹599) in the Dorm Store, or laptop cleaning service (₹799) in the Services booking page.';
              } else {
                reply = 'I can guide you to printing PDF files, buying second-hand textbooks, scheduling room cleans, or ordering exam kits. Tell me what you need!';
              }
              setAiMessages(prev => [...prev, { sender: 'ai', text: reply }]);
            }, 800);
          }}>
            <input 
              type="text" 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              placeholder="Ask AI (e.g. Exam Kit...)" 
            />
            <button type="submit">Send</button>
          </form>
        </div>
      ) : (
        <button className="ai-assistant-badge-btn" onClick={() => setAiChatOpen(true)}>
          🧠 Ask AI Assistant
        </button>
      )}
    </div>
  );
}
