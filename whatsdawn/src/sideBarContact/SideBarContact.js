import React from 'react';

const SideBarContact = ({ user, lastMessage, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(); // Call the onClick function passed from the parent component
    };

    let textToDisplay = lastMessage?.content;
    if (textToDisplay?.length > 30) {
        textToDisplay = textToDisplay.substring(0, 27);
        textToDisplay += '...';
    }

    const timeToShow = (time) => {
        if (!time) return '';
        const date = new Date(time);
        const now = new Date();
        if (date.getDate() === now.getDate() &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()) {
            return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        } else {
            return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
        }
    };

    return (
        <div className={`contact ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            <div className="contact-image">
                <img src={user.profilePic} alt="profile" width={'60px'} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="contact-name">{user.displayName}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="contact-last-message">{textToDisplay}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="contact-last-message-time">{timeToShow(lastMessage?.created)}</div>
        </div>
    );
};

export default SideBarContact;
