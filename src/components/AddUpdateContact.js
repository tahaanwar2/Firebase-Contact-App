import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import React from "react";
import "./AddAndUpdateContact.css";

const contactSchemaValidation = Yup.object().shape({
    name: Yup.string().required("Name is Required"),
    email: Yup.string().email("Invalid Email").required("Email is Required"),
});

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact);
            onClose();
            toast.success("Contact Added Successfully");
        } catch (error) {
            console.log(error);
        }
    };
    const updateContact = async (contact, id) => {
        try {
            const contactRef = doc(db, "contacts", id);
            await updateDoc(contactRef, contact);
            onClose();
            toast.success("Contact Updated Successfully");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik
                    validationSchema={contactSchemaValidation}
                    initialValues={
                        isUpdate
                            ? {
                                name: contact.name,
                                email: contact.email,
                            }
                            : {
                                name: "",
                                email: "",
                            }
                    }
                    onSubmit={(values) => {
                        console.log(values);
                        isUpdate ? updateContact(values, contact.id) : addContact(values);
                    }}
                >
                    <div className="form-container">
                        <Form className="form-container">
                            <div className="input-field">
                                <label htmlFor="name" className="input-label">Name</label>
                                <Field name="name" className="input-element" />
                                <div className="error-message">
                                    <ErrorMessage name="name" />
                                </div>
                            </div>

                            <div className="input-field">
                                <label htmlFor="email" className="input-label">Email</label>
                                <Field name="email" className="input-element" />
                                <div className="error-message">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>

                            <button type="submit" className="submit-button">
                                {isUpdate ? "Update" : "Add"} Contact
                            </button>
                        </Form>
                    </div>
                </Formik>
            </Modal>
        </div>
    );
};

export default AddAndUpdateContact;
