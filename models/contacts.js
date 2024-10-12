import {model, Schema} from "mongoose";

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Set name for contact"],
        },
        email: {
            type: String,
            required: [true, "Set email for contact"],
        },
        phone: {
            type: String,
            required: [true, "Set phone for contact"],
        },
        favorite: {
            type: Boolean,
            default: false,
        },
    },
    {versionKey: false}
);

const Contact = model("contacts", contactSchema);

const listContacts = async () => {
    return Contact.find();
};

const getContactById = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId);
        return contact || null;
    } catch (error) {
        console.error("Error reading contacts by id:", error.message);
    }
};

const removeContact = async (contactId) => {
    return Contact.findByIdAndDelete(contactId);
};

const isContactExists = async ({name, email}) => {
    const contact = await Contact.findOne({
        $or: [{name}, {email}],
    });
    return contact !== null;
};


const addContact = async ({name, email, phone}) => {
    return await Contact.create({name, email, phone});
};

const updateContact = async ({id, name, email, phone, favorite}) => {
    return Contact.findByIdAndUpdate(id, {name, email, phone, favorite}, {
        new: true,
    });
};

const updateStatusContact = async ({id, favorite}) => {
    return Contact.findByIdAndUpdate(id, {favorite}, {
        new: true,
    });
};

export {isContactExists, updateStatusContact, listContacts, getContactById, removeContact, addContact, updateContact};