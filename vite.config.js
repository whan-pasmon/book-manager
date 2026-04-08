import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'
// import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    vue(),
    basicSsl(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   devOptions: {
    //     enabled: true // 👈 สำคัญ! ให้ใช้ใน dev ได้
    //   },
    //   manifest: {
    //     name: 'Book Manager',
    //     short_name: 'Books',
    //     description: 'จัดการหนังสือในบ้าน',
    //     theme_color: '#585123',
    //     background_color: '#ffffff',
    //     display: 'standalone',
    //     start_url: '/',
    //     icons: [
    //       {
    //         src: '/icon-192.png',
    //         sizes: '192x192',
    //         type: 'image/png'
    //       },
    //       {
    //         src: '/icon-512.png',
    //         sizes: '512x512',
    //         type: 'image/png'
    //       }
    //     ]
    //   }
    // })
  ]
})
