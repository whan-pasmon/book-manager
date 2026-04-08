import { connectDB } from './lib/db.js'
import Book from './models/Book.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

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
