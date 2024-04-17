import Books from "../models/book.models.js";

async function addBook(req, res) {
  try {
    const book = await Books.create(req.body);
    // 201 for successful posts requests
    return res.status(201).json(book);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function getAllBooks(req, res) {
  try {
    const allBooks = await Books.find();
    // 200 for successful get req
    return res.status(200).json(allBooks);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function getBookById(req, res) {
  try {
    const id = req.params.id;
    const book = await Books.findById(id);
    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function updateBookById(req, res) {
  try {
    const id = req.params.id;
    const updatedBook = await Books.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(updatedBook);
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function deleteBookById(req, res) {
  try {
    const id = req.params.id;
    await Books.deleteOne({ _id: id });
    // For delete and update requests, we use 200 or 204. 204 means no content and is recommended for both
    return res.status(204).send(); // Sending an empty response without JSON data
  } catch (err) {
    return res.status(500).json(err);
  }
}

export { addBook, getAllBooks, getBookById, updateBookById, deleteBookById };
