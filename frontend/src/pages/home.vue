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

    <v-data-table
      :headers="headers"
      :items="filteredBooks"
      :loading="loading"
      item-value="_id"
      fixed-header
      height="100%"
      no-data-text="No data available"
    >
      <template #item.image="{ item }">
        <img
          v-if="item.image"
          :src="item.image"
          style="width: 40px; height: 40px; object-fit: cover; border-radius: 4px; cursor: pointer;"
          @click="openImageDialog(item.image)"
        />
        <v-icon v-else icon="mdi-book-outline" size="40" color="grey" />
      </template>

      <template #item.title="{ item }">
        <div
          style="cursor: pointer; color: #1976d2;"
          @click="goDetail(item)"
        >
          {{ item.title }}
        </div>
      </template>
    </v-data-table>

    <v-dialog v-model="imageDialog" max-width="500">
      <v-card>
        <v-card-text class="text-center pa-4">
          <img :src="imageDialogUrl" style="max-width: 100%; max-height: 70vh; object-fit: contain;" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="imageDialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Quagga from '@ericblade/quagga2'
import { useRouter } from 'vue-router'

const router = useRouter()
const search = ref('')
const barcodeInput = ref(null)
const imageDialog = ref(false)
const imageDialogUrl = ref('')
const loading = ref(false)

function goDetail(book) {
  router.push(`/book/detail/${book._id}`)
}

function openImageDialog(url) {
  imageDialogUrl.value = url
  imageDialog.value = true
}

const API_URL = '/api/books'

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
    { title: '', align: 'start', key: 'image', sortable: false, width: '60px' },
    { title: 'Book Name', align: 'start', key: 'title' },
    { title: 'ISBN', align: 'start', key: 'isbn' },
  ]
const books = ref([])

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(API_URL)
    books.value = await res.json()
  } finally {
    loading.value = false
  }
})

const filteredBooks = computed(() => {
  return books.value.filter(book =>
    (book.title || '').toLowerCase().includes(search.value.toLowerCase()) ||
    String(book.isbn || '').includes(search.value)
  )
})
</script>
