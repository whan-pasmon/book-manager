import { connectDB } from './lib/db.js'
import Book from './models/Book.js'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()

  await connectDB()

  const { id } = req.query

  if (req.method === 'GET') {
    if (id) {
      const book = await Book.findById(id)
      if (!book) return res.status(404).json({ error: 'Not found' })
      return res.json(book)
    }
    const books = await Book.find()
    return res.json(books)
  }

  if (req.method === 'POST') {
    const book = await Book.create(req.body)
    return res.json(book)
  }

  if (req.method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'id is required' })
    const book = await Book.findByIdAndUpdate(id, req.body, { new: true })
    if (!book) return res.status(404).json({ error: 'Not found' })
    return res.json(book)
  }

  res.status(405).end()
}
