import React, { useState, useEffect } from 'react';

function ListStudent() {
  const [students, setStudents] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8080/students/page?page=${pageNumber}`);

      //fetch(`http://localhost:8080/studentpages/${pageNumber}`).then(response=>{console.log(response.headers.get('total-pages'))})
      const data = await response.json();
      setStudents(data.students);
      setTotalPages(data.totalPages);
    }
    fetchData();
  }, [pageNumber]);

  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const prevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const goToPage = (page) => {
    setPageNumber(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
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
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.birthDate}</td>
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
