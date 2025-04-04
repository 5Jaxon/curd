import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {
  createSvgIconsPlugin
}from 'vite-plugin-svg-icons'
const pathResolve = dir =>resolve(__dirname,dir)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs:[resolve(process.cwd(),'src/assets/svg')],
      symbolId:'icon-[dir]-[name]',
    }),
  ],
  pluginOptions:{
    'style-resources-loader':{
      preProcessor:'scss',
      patterns:[]
    }
  },
  server:{
    port:8080,//默认端口
    open:true,//打开浏览器
    cors:true,//允许跨域
  },
  resolve:{
    alias:{
      '@':pathResolve('./src')//@指向src
    }
  }
})
