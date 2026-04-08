<template>
  <v-container>
    <h1 class="mb-4">📚 Book Detail</h1>
    {{ book }}
    <v-row>
        <v-col cols="6">
            <v-text-field v-model="book.name" label="Book Name" hide-details variant="outlined" active density="compact"></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field v-model="book.detail" label="Book Detail" hide-details variant="outlined" active density="compact"></v-text-field>
        </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="6" class="text-left">
        <input ref="cameraInput" type="file" accept="image/*" capture="environment" style="display: none" @change="onPhotoTaken" />
        <v-btn color="#585123" @click="openCamera">
          <v-icon icon="mdi-camera" class="mr-2" />
          Book Cover Image
        </v-btn>
      </v-col>
      
      <v-col v-if="photoUrl" cols="6" class="text-center">
        <div class="position-relative d-inline-block">
          <v-img :src="photoUrl" max-width="300" class="mx-auto rounded" />
          <v-btn icon size="small" color="red" class="position-absolute" style="top: 4px; right: 4px;" @click="removePhoto">
            <v-icon icon="mdi-close" size="small" />
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'

const book = reactive({
  name: '',
  detail: ''
})

const cameraInput = ref(null)
const photoUrl = ref(null)

function openCamera() {
  cameraInput.value.click()
}

function onPhotoTaken(event) {
  const file = event.target.files[0]
  console.log('onPhotoTaken :: ', file)
  if (file) {
    photoUrl.value = URL.createObjectURL(file)
  }
}

function removePhoto() {
  if (photoUrl.value) {
    URL.revokeObjectURL(photoUrl.value)
  }
  photoUrl.value = null
  cameraInput.value.value = ''
}
</script>

<style scoped>

</style>
