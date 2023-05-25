class User {
    constructor(username, password, displayname, picture) {
        this.username = username;
        this.password = password;
        this.displayname = displayname;
        this.picture = picture;
        this.contacts = {};
    }

    addContact(contact) {
        this.contacts[contact.id] = contact;
    }
}

export default User;