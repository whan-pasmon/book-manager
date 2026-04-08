<template>
  <v-container>
    <h1 class="mb-4">📚 Book Detail</h1>
    <v-row>
        <v-col cols="6">
            <v-text-field v-model="book.name" label="Book Name" hide-details variant="outlined" active density="compact"></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field v-model="book.detail" label="Book Detail" hide-details variant="outlined" active density="compact"></v-text-field>
        </v-col>
    </v-row>
    <v-row align="center">
        <v-col cols="11">
            <v-text-field v-model="book.isbn" label="ISBN" hide-details variant="outlined" active density="compact"></v-text-field>
        </v-col>
        <v-col cols="1">
            <input ref="barcodeInput" type="file" accept="image/*" capture="environment" style="display: none" @change="onBarcodeCaptured" />
            <v-btn icon variant="text" @click="barcodeInput.click()">
              <v-icon icon="mdi-barcode-scan" />
            </v-btn>
        </v-col>
    </v-row>

    <v-row class="mt-4 justify-end">
      <v-col cols="auto">
        <input ref="cameraInput" type="file" accept="image/*" capture="environment" style="display: none" @change="onPhotoTaken" />
        <v-btn color="#585123" @click="openCamera">
          <v-icon icon="mdi-camera" class="mr-2" />
          Book Cover Image
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn color="success" :loading="saving" @click="saveBook">
          <v-icon icon="mdi-content-save" class="mr-2" />
          Save
        </v-btn>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">{{ snackbarText }}</v-snackbar>

    <v-row class="d-flex justify-center">
        <v-col v-if="photoUrl" cols="6" class="text-center">
            <div class="position-relative d-inline-block">
            <img :src="photoUrl" style="max-width: 300px; width: 100%;" class="rounded" />
            <v-btn icon size="small" color="red" class="position-absolute" style="top: -20px; right: -10px;" @click="removePhoto">
                <v-icon icon="mdi-close" size="small" />
            </v-btn>
            </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import Quagga from '@ericblade/quagga2'

const BASE_URL = 'https://book-manager-chi-two.vercel.app/api'

const book = reactive({
  name: '',
  detail: '',
  isbn: ''
})

const saving = ref(false)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('success')

async function saveBook() {
  saving.value = true
  try {
    let imageUrl = ''

    if (photoBase64.value) {
      const uploadRes = await fetch(`${BASE_URL}/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: photoBase64.value })
      })
      if (!uploadRes.ok) throw new Error('Upload failed')
      const uploadData = await uploadRes.json()
      imageUrl = uploadData.url
    }

    const res = await fetch(`${BASE_URL}/books`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: book.name,
        detail: book.detail,
        isbn: Number(book.isbn) || 0,
        image: imageUrl
      })
    })
    if (!res.ok) throw new Error('Save failed')
    snackbarColor.value = 'success'
    snackbarText.value = 'Save successful!'
    snackbar.value = true
    book.name = ''
    book.detail = ''
    book.isbn = ''
    removePhoto()
  } catch (e) {
    snackbarColor.value = 'error'
    snackbarText.value = 'Save failed!'
    snackbar.value = true
  } finally {
    saving.value = false
  }
}

const barcodeInput = ref(null)
const cameraInput = ref(null)
const photoUrl = ref(null)
const photoBase64 = ref(null)

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
      book.isbn = result.codeResult.code
    } else {
      alert('ไม่พบ barcode ในรูป ลองถ่ายใหม่')
    }
  })
}

function openCamera() {
  cameraInput.value.click()
}

function onPhotoTaken(event) {
  const file = event.target.files[0]
  if (!file) return
  photoUrl.value = URL.createObjectURL(file)

  const reader = new FileReader()
  reader.onload = (e) => {
    photoBase64.value = e.target.result
  }
  reader.readAsDataURL(file)
}

function removePhoto() {
  if (photoUrl.value) {
    URL.revokeObjectURL(photoUrl.value)
  }
  photoUrl.value = null
  photoBase64.value = null
  cameraInput.value.value = ''
}
</script>

<style scoped>

</style>
