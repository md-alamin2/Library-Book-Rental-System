import { Request, Response } from "express";
import { bookServices } from "./book.service";

const addBooks = async (req: Request, res: Response) => {
  const { total_copies, available_copies } = req.body;
  try {
    if (total_copies !== available_copies) {
      return res.status(500).json({
        success: false,
        message: "Total copies are not same as available copies",
      });
    }

    const result = await bookServices.addBooks(req.body);

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  const { category } = req.query;
  try {
    const result = await bookServices.getAllBooks(category as string | unknown);

    res.status(200).json({
      success: true,
      message: "Get all books successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  try {
    const result = await bookServices.getSingleBook(id as string);

    res.status(200).json({
      success: true,
      message: "User get successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

const updateBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  try {
    const result = await bookServices.updateBook(req.body, id as string);

    res.status(200).json({
      success: true,
      message: "Book update successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  const id = req.params.bookId;
  try {
    const result = await bookServices.deleteBook(id as string);

    if (result.rowCount === 0) {
      return res.status(500).json({
        success: false,
        message: "Book dose not exist",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const booksController = {
  addBooks,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
