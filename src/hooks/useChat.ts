import { useState, useCallback } from 'react';

export const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const addMessage = useCallback((role, content) => {
        setMessages((prev) => [...prev, { id: Date.now(), role, content, timestamp: new Date() }]);
    }, []);

    const sendMessage = useCallback(async (userMessage) => {
        setLoading(true);
        setError(null);
        addMessage('user', userMessage);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage, history: messages }),
            });
            const data = await response.json();
            addMessage('assistant', data.response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [messages, addMessage]);

    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return { messages, loading, error, sendMessage, clearMessages, addMessage };
};