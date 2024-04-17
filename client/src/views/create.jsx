import React, { useState, useEffect } from "react";
import Nav from "../components/nav.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Create = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isAvailable, setisAvailable] = useState(false);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      pages,
      isAvailable,
    };

    axios
      .post(`http://localhost:8000/api/books`, newBook)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        console.log("ERROR RESPONSE: ", err.response);
        console.log("ERROR RESP DATA: ", err.response.data);
        console.log("ERROR RESP DATA ERRORS: ", err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div>
      <Nav />
      <div>
        <form onSubmit={submitHandler}>
          {/* Title */}
          <div>
            <label className="label">Title:</label>
            <input
              className="input"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {errors.title ? (
              <p className="text-danger">{errors.title.message}</p>
            ) : null}
          </div>

          {/* Author */}
          <div>
            <label className="label">Author Name:</label>
            <input
              className="input"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
            {errors.author ? (
              <p className="text-danger">{errors.author.message}</p>
            ) : null}
          </div>

          {/* pages */}
          <div>
            <label className="label">Page Count:</label>
            <input
              className="input"
              type="number"
              onChange={(e) => setPages(e.target.value)}
              value={pages}
            />
            {errors.pages ? (
              <p className="text-danger">{errors.pages.message}</p>
            ) : null}
          </div>

          {/* is Available */}
          <div>
            <label className="form-label">Available:</label>
            <input
              className=""
              type="checkbox"
              onChange={() => setisAvailable(!isAvailable)}
              checked={isAvailable}
            />
            {errors.isAvailable ? (
              <p className="text-danger">{errors.isAvailable.message}</p>
            ) : null}
          </div>

          <button>Add Book</button>
        </form>
      </div>
    </div>
  );
};

export default Create;
