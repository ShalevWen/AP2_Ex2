import '../index.css'
import send_icon from '../img/send_icon.svg'
import React, { useState, useEffect } from 'react';
import ChatMessage from '../chatMessage/ChatMessage';

function Chat({ selectedChat, messagesList, setMessagesList }) {
    const [chatInput, setChatInput] = useState('');

    useEffect(() => {
        if (selectedChat) {
            async function getMessages() {
                const res = await fetch(`${sessionStorage.server}/Chats/${selectedChat.id}/Messages`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.token}`
                    }
                })
                const messages = await res.json();
                setMessagesList(messages.map((message, id) => (
                    <ChatMessage {...message} key={id} />
                )));
            }
            getMessages();
        }
    }, [selectedChat]);

    const handleMessageSend = async () => {
        if (chatInput.trim() !== '') {
            const res = await fetch(`${sessionStorage.server}/Chats/${selectedChat?.id}/Messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.token}`
                },
                body: JSON.stringify({
                    msg: chatInput
                })
            })
            const newMessage = await res.json();
            const updatedMessagesList = [<ChatMessage {...newMessage} key={newMessage.id} />, ...messagesList];
            setChatInput('');
            setMessagesList(updatedMessagesList);
        }
    };

    const selectedContact = selectedChat?.user;

    if (selectedChat) {
        return (
            <div id="main-chat">
                <div id="main-chat-header">
                    <div id="main-chat-image">
                        <img
                            src={selectedContact?.profilePic}
                            alt="profile"
                            width={'60px'}
                        />
                    </div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <div id="main-chat-name">{selectedContact?.displayName}</div>
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