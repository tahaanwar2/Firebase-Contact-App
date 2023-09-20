import { deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase'; 
import AddAndUpdateContact from "./AddUpdateContact";
import useDisclouse from "../useDisclouse";
import { toast } from "react-toastify";
import "./Contact.css"

const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-info">
        <img src="/images/user.png" alt="User Icon" />
        <div className="contact-details">
          <h2>{contact.name}</h2>
          <p>{contact.email}</p>
        </div>
      </div>
      <div className="contact-actions">
        <img
          src="/images/edit.png"
          alt="Edit Icon"
          onClick={onOpen}
          className="edit-icon"
        />
        <img 
          src="/images/delete.png"
          alt="Delete Icon"
          onClick={() => deleteContact(contact.id)}
          className="delete-icon"
        />
      </div>
      <AddAndUpdateContact
        contact={contact}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </div>
  );
};

export default ContactCard;
