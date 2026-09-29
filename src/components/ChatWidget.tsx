import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, RefreshCw } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { getNextNode } from '../engine/flowEngine';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { flowConfig, chatHistory, addMessage, currentNodeId, setCurrentNodeId, resetChat } = useChatStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  useEffect(() => {
    if (isOpen && chatHistory.length === 0) {
      processNode(currentNodeId || 'start_node');
    }
  }, [isOpen]);

  const processNode = async (nodeId: string, userInput?: string) => {
    if (!flowConfig.nodes.length) return;
    
    let currentNodeIdLocal = nodeId;
    let node = flowConfig.nodes.find(n => n.id === currentNodeIdLocal);
    
    // Evaluate conditions instantly without showing them in chat
    while (node && node.type === 'conditionNode') {
      const conditionType = node.data?.conditionType || 'keyword';
      let conditionMet = false;
      
      if (conditionType === 'keyword') {
        const keyword = (node.data?.keyword as string || '').toLowerCase();
        conditionMet = keyword ? (userInput || '').toLowerCase().includes(keyword) : false;
      } else if (conditionType === 'time') {
        const hour = new Date().getHours();
        conditionMet = hour >= 8 && hour < 17; // 8 AM to 5 PM
      }
      
      const handleId = conditionMet ? 'true' : 'false';
      const nextNodeData = getNextNode(flowConfig, node.id, handleId);
      
      if (!nextNodeData) {
         addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: `Alur terputus pada percabangan ${conditionMet ? 'True' : 'False'}.` });
         return;
      }
      
      currentNodeIdLocal = nextNodeData.id;
      node = flowConfig.nodes.find(n => n.id === currentNodeIdLocal);
    }

    if (!node) return;
    setCurrentNodeId(currentNodeIdLocal); // Set the current visible node

    if (node.type !== 'intentNode') {
      setIsTyping(true);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsTyping(false);
    }

    if (node.type === 'startNode' || node.type === 'messageNode') {
      const text = (node.data.label as string) || '';
      const msgId = Date.now().toString() + Math.random().toString(36).substring(7);
      if (text) {
        addMessage({ id: msgId, sender: 'bot', text });
      }
      const nextNode = getNextNode(flowConfig, node.id);
      if (nextNode) {
        setCurrentNodeId(nextNode.id);
        processNode(nextNode.id);
      }
    } else if (node.type === 'optionsNode') {
      const options = (node.data.options as any[]) || [];
      const text = (node.data.label as string) || '';
      
      const mappedOptions = options.map(opt => ({
        id: opt.id,
        label: opt.label,
        targetNodeId: '' // The exact target will be resolved in getNextNode
      }));

      addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text, options: mappedOptions });
    } else if (node.type === 'whatsAppNode') {
      const text = (node.data.label as string) || '';
      if (text) {
        addMessage({ id: Date.now().toString(), sender: 'bot', text });
      }
      const phone = node.data.phone as string || '';
      if (phone) {
        window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}`, '_blank');
      }
    } else if (node.type === 'imageNode') {
      const imageUrl = (node.data.imageUrl as string) || '';
      if (imageUrl) {
        addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: '', imageUrl });
      }
      const nextNode = getNextNode(flowConfig, node.id);
      if (nextNode) {
        setCurrentNodeId(nextNode.id);
        processNode(nextNode.id);
      }
    } else if (node.type === 'geminiNode') {
      if (userInput) {
        // Call Gemini API
        setIsTyping(true);
        try {
          const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              prompt: userInput,
              instruction: node.data?.instruction || ''
            }),
          });
          const data = await response.json();
          addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: data.reply || 'Maaf, terjadi kesalahan.' });
        } catch (error) {
          addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: 'Gagal menghubungi server. Pastikan backend berjalan.' });
        } finally {
          setIsTyping(false);
        }
      } else {
        // Just entered Gemini node from a button click without a prompt
        const text = (node.data.welcomeMessage as string) || '';
        if (text) {
          addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text });
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'user', text: userText });
    setInput('');

    const node = flowConfig.nodes.find(n => n.id === currentNodeId);
    
    // Determine which Intent Node to use. If current node is intentNode, use it.
    // Otherwise, find the first intentNode in the flow to act as a global router.
    let targetIntentNode = node?.type === 'intentNode' ? node : flowConfig.nodes.find(n => n.type === 'intentNode');

    if (node?.type === 'geminiNode') {
      await processNode(currentNodeId!, userText);
    } else if (targetIntentNode) {
      const intents = targetIntentNode.data.intents as any[] || [];
      const userInputLower = userText.toLowerCase();
      let matchedIntentId = 'fallback';

      for (const intent of intents) {
        const keywords = (intent.keywords as string || '').toLowerCase().split(',').map(k => k.trim()).filter(k => k);
        if (keywords.some(k => userInputLower.includes(k))) {
          matchedIntentId = intent.id;
          break;
        }
      }

      const targetNodeAfterIntent = getNextNode(flowConfig, targetIntentNode.id, matchedIntentId);
      if (targetNodeAfterIntent) {
        setCurrentNodeId(targetNodeAfterIntent.id);
        await processNode(targetNodeAfterIntent.id, userText);
      } else {
        addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: 'Alur terputus pada Intent Router.' });
      }
    } else {
      // Fallback to Gemini API or default error if absolutely no Intent Router exists
      const geminiNode = flowConfig.nodes.find(n => n.type === 'geminiNode');
      if (geminiNode) {
        setCurrentNodeId(geminiNode.id);
        await processNode(geminiNode.id, userText);
      } else {
         addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: 'Maaf, alur belum disetting untuk menangani input teks bebas.' });
      }
    }
  };

  const handleOptionClick = (optionId: string, label: string) => {
    addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'user', text: label });
    const nextNode = getNextNode(flowConfig, currentNodeId!, optionId);
    if (nextNode) {
      setCurrentNodeId(nextNode.id);
      processNode(nextNode.id);
    } else {
       addMessage({ id: Date.now().toString() + Math.random().toString(36).substring(7), sender: 'bot', text: 'Opsi ini belum terhubung ke mana pun.' });
    }
  };

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
      style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}
    >
      {isOpen && (
        <div 
          className="bg-white w-80 h-[450px] shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4 border border-gray-200"
          style={{ backgroundColor: 'white', width: '320px', height: '450px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderRadius: '1rem', display: 'flex', flexDirection: 'column', overflow: 'hidden', marginBottom: '16px', border: '1px solid #e5e7eb' }}
        >
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center" style={{ backgroundColor: '#2563eb', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-3">
              <img src="/Prompbot.jfif" alt="Prompbot" className="w-10 h-10 rounded-full object-cover border-2 border-white/30 shadow-sm" style={{ width: '40px', height: '40px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.3)' }} />
              <div className="flex flex-col">
                <h3 className="font-bold text-base leading-tight">Prompbot</h3>
                <span className="text-xs text-blue-100" style={{ fontSize: '11px', color: '#dbeafe' }}>Virtual Assistant</span>
              </div>
            </div>
            <div className="flex gap-2">
               <button onClick={resetChat} className="text-blue-100 hover:text-white text-xs underline mr-2">Reset</button>
               <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                 <X size={20} />
               </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gray-50">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                {msg.sender === 'bot' && (
                  <img src="/Prompbot.jfif" alt="Bot" className="w-7 h-7 rounded-full object-cover mr-2 self-end mb-1 shadow-sm border border-gray-200" />
                )}
                <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%]`}>
                  {msg.text && (
                    <div className={`w-full p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white border rounded-bl-sm shadow-sm text-gray-800'}`}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 my-1 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-1 space-y-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                          strong: ({node, ...props}) => <strong className="font-bold text-black" {...props} />,
                          h1: ({node, ...props}) => <h1 className="font-bold text-lg mb-1" {...props} />,
                          h2: ({node, ...props}) => <h2 className="font-bold text-md mb-1" {...props} />,
                          h3: ({node, ...props}) => <h3 className="font-bold mb-1" {...props} />,
                          table: ({node, ...props}) => (
                            <div className="overflow-x-auto my-2 border border-gray-200 rounded-lg">
                              <table className="min-w-full divide-y divide-gray-200 text-sm" {...props} />
                            </div>
                          ),
                          thead: ({node, ...props}) => <thead className="bg-gray-50" {...props} />,
                          tbody: ({node, ...props}) => <tbody className="divide-y divide-gray-200 bg-white" {...props} />,
                          tr: ({node, ...props}) => <tr className="hover:bg-gray-50/50" {...props} />,
                          th: ({node, ...props}) => <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider bg-gray-50" {...props} />,
                          td: ({node, ...props}) => <td className="px-3 py-2 whitespace-nowrap text-gray-700" {...props} />,
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                  {msg.imageUrl && (
                    <div className={`w-full rounded-2xl overflow-hidden shadow-sm border border-gray-200 bg-white ${msg.text ? 'mt-2' : ''}`}>
                      <img src={msg.imageUrl} alt="Bot sent media" className="w-full h-auto object-cover" />
                    </div>
                  )}
                  {msg.options && msg.options.length > 0 && (
                    <div className={`flex flex-col gap-2 w-full ${msg.text ? 'mt-2' : ''}`}>
                      {msg.options.map(opt => {
                        const isLatestMessage = msg.id === chatHistory[chatHistory.length - 1].id;
                        return (
                          <button
                            key={opt.id}
                            disabled={!isLatestMessage}
                            onClick={() => handleOptionClick(opt.id, opt.label)}
                            className={`bg-blue-50 text-blue-600 border border-blue-200 rounded-xl p-2.5 text-sm font-medium text-left transition-all shadow-sm ${isLatestMessage ? 'hover:bg-blue-600 hover:text-white cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex w-full justify-start mb-2">
                <img src="/Prompbot.jfif" alt="Bot" className="w-7 h-7 rounded-full object-cover mr-2 self-end mb-1 shadow-sm border border-gray-200" />
                <div className="bg-white border rounded-2xl rounded-bl-sm p-3 shadow-sm max-w-[85%] self-start text-sm text-gray-500 italic">
                  Bot sedang mengetik...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ketik pesan..."
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full shadow-xl transition-transform hover:scale-105 overflow-hidden flex items-center justify-center"
        style={{ 
          backgroundColor: isOpen ? '#2563eb' : 'transparent', 
          color: 'white', 
          padding: isOpen ? '16px' : '0', 
          border: isOpen ? 'none' : '2px solid white', 
          cursor: 'pointer', 
          width: '60px', 
          height: '60px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' 
        }}
      >
        {isOpen ? <X size={24} /> : <img src="/Prompbot.jfif" alt="Chat" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
      </button>
    </div>
  );
}
