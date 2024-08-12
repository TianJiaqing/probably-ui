import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    open: true
  },
  build: {
    outDir: 'probably-ui', // 打包文件的输出目录
    terserOptions: {
      compress: {
        drop_console: false
      }
    },
    lib: {
      entry: './src/package/index.js',
      name: 'MyLib',
      fileName: 'my-lib',

    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

})
