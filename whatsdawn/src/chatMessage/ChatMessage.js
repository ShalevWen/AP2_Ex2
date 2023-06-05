function ChatMessage({ sender, content, created }) {
    const timeToShow = (time) => {
        const date = new Date(time);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };
    
    const user = JSON.parse(sessionStorage.user);

    return (
        <div className={`message ${sender.username === user.username ? 'sent' : 'received'}`}>
            <div className="message-text">{content}</div>
            <div className="message-time">{timeToShow(created)}</div>
        </div>
    );
}

export default ChatMessage;