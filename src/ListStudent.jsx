import React, { useState, useEffect } from 'react';
import './ListStudent.css'

function ListStudent() {
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchLastName, setSearchLastName] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/students/?page=${pageNumber}&name=${searchName}&lastname=${searchLastName}`);

      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    }
    fetchData();
  }, [pageNumber, searchName, searchLastName]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const goToPage = (page) => {
    setPageNumber(page);
  };

  const search = () => {
    setPageNumber(1);
  };

  const updateStudent = async (id) => {
    const firstName = window.prompt("Enter new first name");
    const lastName = window.prompt("Enter new last name");
    const birthDate = window.prompt("Enter new birth date");
  
    if (!firstName || !lastName || !birthDate) {
      alert("Please enter valid values for first name , last name and birth date");
      return;
    }
  
    const body = { firstName, lastName,birthDate};
  
    const response = await fetch(`http://localhost:8080/students/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  
    if (response.ok) {
      fetchData();
    }
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Search by Name" value={searchName} onChange={(e) => setSearchName(e.target.value)} />
        <input type="text" placeholder="Search by Last Name" value={searchLastName} onChange={(e) => setSearchLastName(e.target.value)} />
        <button onClick={search}>Search</button>
      </div>
      <table>
        <thead>
          <tr>
            Page : {pageNumber} / {totalPages}
          </tr>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Birthdate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.birthDate}</td>
              <td>
              <button onClick={() => updateStudent(student.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={prevPage} disabled={pageNumber === 1}>Previous Page</button>
        {pageNumbers.map((page) => (
          <button key={page} onClick={() => goToPage(page)} className={page === pageNumber ? 'active' : ''}>
            {page}
          </button>
        ))}
        <button onClick={nextPage} disabled={pageNumber === totalPages}>Next Page</button>
      </div>
    </div>
  );
}

export default ListStudent;