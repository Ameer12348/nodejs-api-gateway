const express = require("express");
const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                 user:
 *                   type: object
 *                   description: User information
 */

router.get("/books", (req, res) => {
  res.send({
    books: [
      {
        id: 1,
        title: "The great gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        price: 9.99,
      },
      {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        price: 8.99,
      },
      {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Science Fiction",
        price: 7.99,
      },
      {
        id: 4,
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        genre: "Fiction",
        price: 6.99,
      },
      {
        id: 5,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        price: 10.99,
      },
      {
        id: 6,
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        genre: "Science Fiction",
        price: 9.99,
      },
      {
        id: 7,
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science Fiction",
        price: 8.99,
      },
      {
        id: 8,
        title: "One Hundred Years of Solitude",
        author: "Gabriel Garcia Marquez",
        genre: "Magical Realism",
        price: 12.99,
      },
      {
        id: 9,
        title: "The Sound and the Fury",
        author: "William Faulkner",
        genre: "Fiction",
        price: 11.99,
      },
      {
        id: 10,
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        genre: "Gothic Fiction",
        price: 13.99,
      },
      {
        id: 11,
        title: "The Sun Also Rises",
        author: "Ernest Hemingway",
        genre: "Fiction",
        price: 14.99,
      },
    ],
    user: req.user,
  });
});

module.exports = router;
