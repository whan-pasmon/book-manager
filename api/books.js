import { connectDB } from './lib/db'
import Book from './models/Book'

export default async function handler(req, res) {
  await connectDB()

  if (req.method === 'GET') {
    const books = await Book.find()
    return res.json(books)
  }

  if (req.method === 'POST') {
    const book = await Book.create(req.body)
    return res.json(book)
  }

  res.status(405).end()
}
