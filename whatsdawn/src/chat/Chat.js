import '../index.css'
import send_icon from '../img/send_icon.svg'
import React, { useState, useEffect } from 'react';
import ChatMessage from '../chatMessage/ChatMessage';

function Chat({ selectedContact, messagesList, setMessagesList }) {
    const [chatInput, setChatInput] = useState('');

    useEffect(() => {
        setMessagesList(selectedContact?.messages.map((message, key) => (
            <ChatMessage {...message} key={key} />
        )));
    }, [selectedContact]);

    const handleMessageSend = () => {
        if (chatInput.trim() !== '') {
            const newMessage = {
                messageText: chatInput,
                timestamp: getCurrentTime(),
                sender: 'me',
                key: new Date().getTime(),
            };
            window.activeUser?.contacts[selectedContact.id].addMessage(newMessage);
            const updatedMessagesList = [...messagesList, <ChatMessage {...newMessage}/>];
            setChatInput('');
            setMessagesList(updatedMessagesList);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };


    if (selectedContact) {
        return (
            <div id="main-chat">
                <div id="main-chat-header">
                    <div id="main-chat-image">
                        <img
                            src={selectedContact?.image}
                            alt="profile"
                            width={'60px'}
                        />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="main-chat-name">{selectedContact?.name}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="contact-last-seen">Last seen 5 minutes ago</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div id="main-chat-body">{messagesList}</div>
                <div id="main-chat-footer">
                    <input
                        id="msg-text-input"
                        type="text"
                        placeholder="Type a message"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleMessageSend();
                            }
                        }}
                    />
                    <button id="msg-send-btn" className="btn" onClick={handleMessageSend}>
                        <img src={send_icon} alt="Send" />
                    </button>
                </div>
            </div>
        );
    } else {
        return (
            <div id="main-chat" className='empty-main-chat' />
        );
    }
}

export default Chat;