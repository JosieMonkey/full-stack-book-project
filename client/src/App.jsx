import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./views/home.jsx";
import BookDetails from "./views/bookDetails.jsx";
import Create from "./views/create.jsx";
import Update from "./views/update.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/books/:id/details" element={<BookDetails />} />
        <Route path="/create" element={<Create />} />
        <Route path="/books/:id/update" element={<Update />} />
      </Routes>
    </>
  );
}

export default App;
