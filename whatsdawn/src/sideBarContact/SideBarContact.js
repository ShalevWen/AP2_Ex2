import React from 'react';

const SideBarContact = ({ name, lastMessage, image, onClick, isSelected }) => {
    const handleClick = () => {
        onClick(); // Call the onClick function passed from the parent component
    };

    let textToDisplay = lastMessage?.messageText;
    if (textToDisplay?.length > 30) {
        textToDisplay = textToDisplay.substring(0, 27);
        textToDisplay += '...';
    }

    return (
        <div className={`contact ${isSelected ? 'selected' : ''}`} onClick={handleClick}>
            <div className="contact-image">
                <img src={image} alt="profile" width={'60px'} />
            </div>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <div className="contact-name">{name}</div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div className="contact-last-message">{textToDisplay}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="contact-last-message-time">{lastMessage?.timestamp}</div>
        </div>
    );
};

export default SideBarContact;
