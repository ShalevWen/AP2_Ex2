import '../index.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chat from '../chat/Chat';
import SideBar from '../sideBar/SideBar';


function ChatScreen() {
    const navigate = useNavigate();
    const [selectedChat, setSelectedChat] = useState(null);
    const [messagesList, setMessagesList] = useState([]);

    useEffect(() => {
        if (!sessionStorage.user) {
            navigate('/');
        }
    });

    return (
        <>
            <div id="chat-container">
                <SideBar
                    selectedChat={selectedChat}
                    setSelectedChat={setSelectedChat}
                    messagesList={messagesList}
                />
                <Chat
                    selectedChat={selectedChat}
                    messagesList={messagesList}
                    setMessagesList={setMessagesList}
                />
            </div>
        </>
    );
}

export default ChatScreen;