<template>
  <v-container>
    <h1 class="mb-4">📚 Book Lists</h1>
    <v-row align="center" no-gutters>
      <v-col>
        <v-text-field
            v-model="search"
            label="ค้นหาหนังสือ"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
            hide-details
        />
      </v-col>
      <v-col cols="auto">
        <input ref="barcodeInput" type="file" accept="image/*" capture="environment" style="display: none" @change="onBarcodeCaptured" />
        <v-btn icon variant="text" @click="barcodeInput.click()">
          <v-icon icon="mdi-barcode-scan" />
        </v-btn>
      </v-col>
    </v-row>

    <v-data-table-virtual
        :headers="headers"
        :items="filteredBooks"
        :search="search"
        height="100%"
        item-value="name"
        fixed-header
        no-data-text="No data available"
    ></v-data-table-virtual>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Quagga from '@ericblade/quagga2'

const search = ref('')
const barcodeInput = ref(null)

const API_URL = 'https://book-manager-chi-two.vercel.app/api/books'

function onBarcodeCaptured(event) {
  const file = event.target.files[0]
  if (!file) return

  const imageUrl = URL.createObjectURL(file)

  Quagga.decodeSingle({
    src: imageUrl,
    numOfWorkers: 0,
    locate: true,
    decoder: {
      readers: ['ean_reader', 'ean_8_reader', 'code_128_reader', 'upc_reader', 'upc_e_reader']
    }
  }, (result) => {
    URL.revokeObjectURL(imageUrl)
    barcodeInput.value.value = ''

    if (result && result.codeResult) {
      search.value = result.codeResult.code
    } else {
      alert('ไม่พบ barcode ในรูป ลองถ่ายใหม่')
    }
  })
}
const headers = [
    { title: 'Book Name', align: 'start', key: 'title' },
    { title: 'ISBN', align: 'start', key: 'isbn' },
    { title: '', align: 'end', key: 'year' },
  ]
const books = ref([])

onMounted(async () => {
  const res = await fetch(API_URL)
  books.value = await res.json()
})

const filteredBooks = computed(() => {
  console.log('books :: ', books.value)
  return books.value.filter(book =>
    book.title.toLowerCase().includes(search.value.toLowerCase()) ||
    String(book.isbn).includes(search.value)
  )
})
</script>
