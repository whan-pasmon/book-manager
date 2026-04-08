<template>
  <v-container>
    <h1 class="mb-4">📚 Book Lists</h1>
    <v-text-field
        label="ค้นหาหนังสือ"
        prepend-inner-icon="mdi-magnify"
        variant="underlined"
        ></v-text-field>

    <v-data-table-virtual
        :headers="headers"
        :items="filteredBooks"
        height="100%"
        item-value="name"
        fixed-header
        no-data-text="No data available"
    ></v-data-table-virtual>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'

const search = ref('')
const headers = [
    { title: 'Book Name', align: 'start', key: 'title' },
    { title: 'ISBN', align: 'end', key: 'isbn' },
    { title: 'Category', align: 'end', key: 'category' },
  ]
const books = ref([
  { id: 1, title: 'Harry Potter', isbn: '123', category: '1'},
  { id: 2, title: 'One Piece', isbn: '456', category: '2' },
  { id: 3, title: 'One Piece', isbn: '456', category: '1' },
  { id: 4, title: 'One Piece', isbn: '456', category: '2' },
  { id: 5, title: 'One Piece', isbn: '456', category: '1' },
  { id: 5, title: 'One Piece', isbn: '456', category: '1' },
  { id: 6, title: 'One Piece', isbn: '456', category: '1' },
  { id: 7, title: 'One Piece', isbn: '456', category: '1' },
  { id: 8, title: 'One Piece', isbn: '456', category: '1' },
  { id: 9, title: 'One Piece', isbn: '456', category: '1' },
  { id: 10, title: 'One Piece', isbn: '456', category: '1' }
])

const filteredBooks = computed(() => {
  return books.value.filter(book =>
    book.title.toLowerCase().includes(search.value.toLowerCase()) ||
    book.isbn.includes(search.value)
  )
})
</script>
