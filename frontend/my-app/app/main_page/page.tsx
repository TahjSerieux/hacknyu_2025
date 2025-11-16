'use client';

import React, { useRef, useState } from 'react';
import './main_page_style.css';
import FlowChart from '../components/flowChart';

export default function first_sight(){
    const flowChartRef = useRef<any>(null);
    const [userQuery, setUserQuery] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (userQuery.trim() && flowChartRef.current) {
            // Add query to chat history
            setChatHistory([...chatHistory, userQuery]);
            
            // Call the generateFlowChart function from the FlowChart component
            flowChartRef.current.generateFlowChart(userQuery);
            // Clear the input after submission
            setUserQuery('');
        }
    };

    return(
        <div className="main-container">
            {/* Left side - Text for user to read */}
            <div className="left-panel">
                <h1>Welcome to the Online Tutor</h1>
                <p>This is your interactive learning space. Here you can ask questions and get personalized help.</p>
                

                <div className = "chat-window">
                    {chatHistory.length === 0 ? (
                        <p>Your questions will appear here...</p>
                    ) : (
                        chatHistory.map((query, index) => (
                            <div key={index} className="chat-message">
                                <strong>Q{index + 1}:</strong> {query}
                            </div>
                        ))
                    )}
                </div>
                <div className="chat-section">
                    <h2>Ask a Question:</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Enter your question below:</label>
                        <input 
                            type="text" 
                            placeholder="Type your question here..." 
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>

            {/* Right side - Placeholder for future use */}
            <div className="right-panel">
                <FlowChart ref={flowChartRef} pre_text="input" />
            </div>
        </div>
    )
}
