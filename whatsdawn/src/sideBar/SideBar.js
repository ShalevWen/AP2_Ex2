import add_contact from '../img/add_contact.png';
import logout_button from '../img/logout.svg';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBarContact from '../sideBarContact/SideBarContact';
import Contact from '../contact/Contact';

function SideBar({ selectedContact, setSelectedContact, messagesList }) {
    const navigate = useNavigate();
    const [contactsList, setContactsList] = useState([]);

    useEffect(() => {
        setContactsList(Object.values(window.activeUser?.contacts).map((contact) => (
            <SideBarContact
                {...contact}
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                isSelected={contact.id === selectedContact?.id}
            />
        )));
    }, [selectedContact, messagesList]);

    const handleAddContact = (event) => {
        event.preventDefault();
        const newContactName = event.target.contactName.value.trim();
        if (newContactName !== '') {
            const newContact = new Contact(newContactName);
            window.activeUser?.addContact(newContact);

            const newSideBarContact = <SideBarContact
                {...newContact}
                key={newContact.id}
                onClick={() => handleContactClick(newContact)}
                isSelected={false} />;

            setContactsList(contactsList ?
                [...contactsList, newSideBarContact]
                : [newSideBarContact]);
            setSelectedContact(newContact);
        }
        event.target.reset();
    };

    const handleContactClick = (contact) => {
        setSelectedContact(contact);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        window.activeUser = null;
        navigate('/');
    };

    return (
        <>
            <div id="side-bar">
                <div id="side-bar-header">
                    <div id="profile-image">
                        <img
                            src={window.activeUser?.picture}
                            alt="profile"
                            width={'60px'}
                        />
                    </div>
                    <div id="profile-name">{window.activeUser?.name}</div>
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
                {contactsList}
            </div>
            <div className="modal fade" id="add-contact-modal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <h3 className="modal-title">Add contact</h3>
                            <form onSubmit={handleAddContact}>
                                <input type="text" name="contactName" placeholder="Enter contact name" />
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