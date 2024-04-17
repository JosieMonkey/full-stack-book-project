import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav.jsx";
import { useNavigate, useParams } from "react-router-dom";

const Update = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState("");
  const [isAvailable, setiIsAvailable] = useState(false);

  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/books/${id}`)
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPages(res.data.pages);
        setiIsAvailable(res.data.isAvailable);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const newBook = {
      title,
      author,
      pages,
      isAvailable,
    };

    axios
      .put(`http://localhost:8000/api/books/${id}`, newBook)
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
      <Nav title={`Update ${title}`} />
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
            onChange={() => setiIsAvailable(!isAvailable)}
            checked={isAvailable}
          />
          {errors.isAvailable ? (
            <p className="text-danger">{errors.isAvailable.message}</p>
          ) : null}
        </div>

        <button>Update</button>
      </form>
    </div>
  );
};

export default Update;
