import '../index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../chat/Chat';
import SideBar from '../sideBar/SideBar';


function ChatScreen() {
    const navigate = useNavigate();
    const [selectedContact, setSelectedContact] = useState(null);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        if (window.activeUser === null) {
            navigate('/');
        }
    });

    return (
        <>
            <div id="chat-container">
                <SideBar
                    selectedContact={selectedContact}
                    setSelectedContact={setSelectedContact}
                    messagesList={messagesList}
                />
                <Chat
                    selectedContact={selectedContact}
                    messagesList={messagesList}
                    setMessagesList={setMessagesList}
                />
            </div>
        </>
    );
}

export default ChatScreen;