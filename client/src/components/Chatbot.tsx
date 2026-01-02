import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState<{ text: string, sender: 'bot' | 'user' }[]>([
        { text: "Hello! Welcome to DyeMaster. How can we verify your fabric needs today?", sender: 'bot' }
    ]);

    const handleSend = () => {
        if (!inputText.trim()) return;
        setMessages([...messages, { text: inputText, sender: 'user' }]);
        setInputText('');
        // No logic required per spec
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-secondary hover:bg-red-900 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
                >
                    <MessageCircle className="h-8 w-8" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col border border-gray-200" style={{ height: '450px' }}>
                    {/* Header - Deep Blue */}
                    <div className="bg-primary-700 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center space-x-2">
                            <MessageCircle className="h-5 w-5" />
                            <span className="font-semibold">DyeMaster Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-white space-y-3">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.sender === 'user'
                                    ? 'bg-secondary text-white' // User -> Secondary (Maroon) or maybe gray to keep it clean? Spec says "Light Grey message bubbles" - presumably for bot?
                                    // Let's stick to standard: User = Color, Bot = Grey
                                    : 'bg-accent text-gray-800' // Bot -> Accent (Light Grey)
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="p-3 border-t border-gray-100 bg-gray-50 flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-700"
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            className="bg-secondary hover:bg-red-900 text-white p-2 rounded-full transition-colors"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
