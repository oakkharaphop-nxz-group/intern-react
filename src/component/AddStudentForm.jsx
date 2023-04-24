import React, { useState } from "react";
import './UpdateStudentForm.css'

const AddStudentForm = ({ fetchData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newBirthDate, setNewBirthDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!newFirstName || !newLastName || !newBirthDate) {
      alert("Please enter valid values for first name, last name, and birth date");
      return;
    }

    const body = { firstName: newFirstName, lastName: newLastName, birthDate: newBirthDate };

    const response = await fetch(`http://localhost:8080/students/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData);
      return;
    }

    setNewFirstName("");
    setNewLastName("");
    setNewBirthDate("");
    setShowPopup(false);
    fetchData();
  };

  const handleCancel = () => {
    setShowPopup(false);
  }

  return (
    <>
      <button onClick={() => setShowPopup(true)}>Add Student</button>
      {showPopup && (
        <div className="popup2">
          <form onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
            </label>
            <label>
              Last Name:
              <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
            </label>
            <label>
              Birth Date:
              <input type="text" value={newBirthDate} onChange={(e) => setNewBirthDate(e.target.value)} />
            </label>
            <button type="submit">Add</button>
            <button onClick={handleCancel}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddStudentForm;
