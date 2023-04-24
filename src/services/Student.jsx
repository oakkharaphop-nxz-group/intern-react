export const getStudent=async(pageNumber,searchName,searchLastName)=>{
    const response = await fetch(`http://localhost:8080/students/?page=${pageNumber}&name=${searchName}&lastname=${searchLastName}`);

    const data = await response.json();

    return data;
}