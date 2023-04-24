import React, { useState } from "react";
import './UpdateStudentForm.css'

const UpdateStudentForm = ({ id, fetchData, setIsEditing }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !birthDate) {
      alert("Please enter valid values for first name, last name, and birth date");
      return;
    }

    const body = { firstName, lastName, birthDate };

    const response = await fetch(`http://localhost:8080/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      fetchData();
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Birth Date:
          <input
            type="text"
            value={birthDate}
            onChange={(event) => setBirthDate(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Update</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default UpdateStudentForm;
