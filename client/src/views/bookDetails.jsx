import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BookDetails = (props) => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books/${id}`)
      .then((res) => {
        console.log(res);
        setBook(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const deleteHandler = () => {
    axios
      .delete(`http://localhost:8000/api/books/${id}`)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <Nav title={book.title} />
      <div>
        <h2>Title: {book.title}</h2>
        <h2>Author: {book.author}</h2>
        <h2>Pages: {book.pages}</h2>
        <h2>Is Available: {book.isAvailable ? "Yes" : "No"}</h2>
        <button onClick={deleteHandler}>Borrow {book.title}</button>
      </div>
    </div>
  );
};

export default BookDetails;
