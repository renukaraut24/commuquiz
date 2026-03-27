import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.jsx',
      name: 'CommuQuiz',
      fileName: (format) => `commuquiz.${format}.js`,
      formats: ['umd', 'es']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom', 'socket.io-client', 'axios', 'qrcode.react'],
      output: [
        {
          format: 'umd',
          name: 'CommuQuiz',
          entryFileNames: '[name].umd.js',
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM',
            'socket.io-client': 'io',
            axios: 'axios',
            'qrcode.react': 'QRCode'
          }
        },
        {
          format: 'es',
          entryFileNames: '[name].es.js'
        }
      ]
    }
  }
})