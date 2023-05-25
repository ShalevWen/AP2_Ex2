class Contact {
    static id = 0;

    constructor(name) {
        this.name = name;
        this.image = 'https://www.w3schools.com/howto/img_avatar.png';
        this.messages = [];
        this.lastMessage = null;
        this.id = Contact.id++;
    }

    addMessage(message) {
        this.messages.push(message);
        this.lastMessage = message;
    }
}

export default Contact;