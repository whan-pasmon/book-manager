import mongoose from 'mongoose'

const BookSchema = new mongoose.Schema({
  title: String,
  detail: String,
  year: Number,
  genre: String,
  isbn: Number,
  image: String
})

export default mongoose.models.Book || mongoose.model('Book', BookSchema)
