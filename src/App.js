import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

import ContactCard from "./components/Contact";
import AddAndUpdateContact from "./components/AddUpdateContact";
import useDisclouse from "./useDisclouse";
import ContactNotFound from "./components/ContactNotFound";
import Navbar from "./components/Navbar";
import "./App.css";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
        });
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);
    });
  };

  const toggleModal = () => {
    if (isModalOpen) {
      onClose();
    } else {
      onOpen();
    }
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="">
        <Navbar />
        <div className="flex gap-2">
          <div className="input-container">
            <div className="input-with-logo">
              <img
                src="/images/input.png"
                alt="Search Icon"
              />
              <input
                onChange={filterContacts}
                type="text"
                className="search-content"
                placeholder="Search Contact"
              />
            </div>
            <div className="input-logo">
              <img
                src="/images/Group 1.png"
                alt="Add Icon"
                onClick={toggleModal}
                className="input-add"
              />
            </div>
          </div>
        </div>
        <div className="">
          {contacts.length <= 0 ? (
            <ContactNotFound />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <AddAndUpdateContact onClose={toggleModal} isOpen={isModalOpen} />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
