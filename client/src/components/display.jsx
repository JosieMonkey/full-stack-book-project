import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayAll = (props) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/books")
      .then((res) => {
        console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Pages</th>
              <th>Avalable</th>
              <th>Book Page</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.pages}</td>
                <td>
                  {book.isAvailable ? "Yes" : "No"}|
                  <Link to={`/books/${book._id}/update`}>Edit</Link>
                </td>
                <td>
                  <Link to={`/books/${book._id}/details`}>Book Details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DisplayAll;
