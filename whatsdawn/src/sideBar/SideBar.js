import add_contact from '../img/add_contact.png';
import logout_button from '../img/logout.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarContact from '../sideBarContact/SideBarContact';

function SideBar({ selectedChat, setSelectedChat, messagesList }) {
    const navigate = useNavigate();
    const [chatsList, setChatsList] = useState([]);

    useEffect(() => {
        async function getChats() {
            const res = await fetch('${sessionStorage.server}/Chats', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.token}`
                }
            })
            const chats = await res.json();
            setChatsList(chats.map((chat) => (
                    <SideBarContact
                        {...chat}
                        key={chat.id}
                        onClick={() => handleContactClick(chat)}
                        isSelected={chat.id === selectedChat?.id}
                    />
            )).sort((a, b) => {
                return new Date(b.lastMessage?.created) - new Date(a.lastMessage?.created);
            }));
        }
        getChats();
    }, [selectedChat, messagesList]);

    const handleAddContact = async (event) => {
        event.preventDefault();
        const newContactName = event.target.contactName.value.trim();
        if (newContactName !== '') {
            const res = await fetch('${sessionStorage.server}/Chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.token}`
                },
                body: JSON.stringify({
                    username: newContactName
                })
            })
            switch (res.status) {
                case 200:
                    const newContact = await res.json();
                    const newSideBarContact = <SideBarContact
                        {...newContact}
                        key={newContact.username}
                        onClick={() => handleContactClick(newContact)}
                        isSelected={false} />;

                    setChatsList(chatsList ?
                        [...chatsList, newSideBarContact]
                        : [newSideBarContact]);
                    setSelectedChat(newContact);
                    break;
                case 400:
                    alert('User not found.');
                    return;
                default:
                    alert('Something went wrong.');
            }
        }
        event.target.reset();
    };

    const handleContactClick = (contact) => {
        setSelectedChat(contact);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        navigate('/');
    };

    const user = JSON.parse(sessionStorage.user ?? '{}');

    return (
        <>
            <div id="side-bar">
                <div id="side-bar-header">
                    <div id="profile-image">
                        <img
                            src={user?.profilePic}
                            alt="profile"
                            width={'60px'}
                        />
                    </div>
                    <div id="profile-name">{user?.displayName}</div>
                    <button
                        id="add-contact"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#add-contact-modal"
                    >
                        <img src={add_contact} alt="Add contact" width={'30px'} />
                    </button>
                    <button
                        id="logout-button"
                        className="btn"
                        data-bs-toggle="modal"
                        data-bs-target="#logout-modal"
                    >
                        <img src={logout_button} alt='Logout' width={'30px'} />
                    </button>
                </div>
                <hr />
                <div id="contacts-search">
                    <input type="text" placeholder="Search" />
                </div>
                <hr />
                {chatsList}
            </div>
            <div className="modal fade" id="add-contact-modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h3 className="modal-title">Add contact</h3>
                            <form onSubmit={handleAddContact}>
                                <input type="text" name="contactName" placeholder="Enter contact username" />
                                <div>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="logout-modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h3 className="modal-title">Logout</h3>
                            <form onSubmit={handleLogout}>
                                <p>Are you sure you want to logout?</p>
                                <div>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Logout</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SideBar;