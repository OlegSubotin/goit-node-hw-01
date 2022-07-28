const { program } = require("commander");
const program = new Command();
const contactsActions = require('./contacts');

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();


function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const contacts = await contactsActions.listContacts();
            console.table(contacts);
            break;
        
        case "get":
            const contact = await contactsActions.getContactById(id);
            console.log(contact);
            break;
        
        case "add":
            const addContact = await contactsActions.addContact(
                name, email, phone
            );
            console.log(addContact);
            break;
        
        case "remove":
            const removeContact = await contactsActions.removeContact(id);
            console.log(removeContact);
            break;
        
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
};

invokeAction(argv);