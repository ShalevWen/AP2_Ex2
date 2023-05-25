function ChatMessage({ messageText, timestamp, sender }) {
    return (
        <div className={`message ${sender === 'me' ? 'sent' : 'received'}`}>
            <div className="message-text">{messageText}</div>
            <div className="message-time">{timestamp}</div>
        </div>
    );
}

export default ChatMessage;