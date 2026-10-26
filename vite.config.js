import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function legacyHtmlPassthrough() {
  const legacyPrefixes = ['/meworksv2a/', '/U/']
  const legacyFiles = new Set(['/_downloads.html'])

  const shouldHandle = (pathname) =>
    legacyFiles.has(pathname) || legacyPrefixes.some((prefix) => pathname.startsWith(prefix))

  const serveLegacy = (req, res, next) => {
    if (!req.url || (req.method !== 'GET' && req.method !== 'HEAD')) {
      next()
      return
    }

    const pathname = decodeURIComponent(req.url.split('?')[0])

    if (!shouldHandle(pathname) || !pathname.endsWith('.html')) {
      next()
      return
    }

    const filePath = path.join(process.cwd(), pathname.replace(/^\//, ''))

    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      next()
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8')

    if (req.method === 'HEAD') {
      res.end()
      return
    }

    res.end(fs.readFileSync(filePath))
  }

  return {
    name: 'legacy-html-passthrough',
    configureServer(server) {
      server.middlewares.use(serveLegacy)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serveLegacy)
    },
  }
}

export default defineConfig({
  plugins: [legacyHtmlPassthrough(), vue()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(process.cwd(), 'index.html'),
        latestNews: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220102.html'),
        basicScience: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220704.html'),
        brainTraining: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220705.html'),
        featuredWorks: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220706.html'),
        famousPeople: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220707.html'),
        everydayKnowledge: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220708.html'),
        oldFarmer: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220709.html'),
        finance: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=220710.html'),
        oldFarmerHistory: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=221276.html'),
        oldFarmerNobel: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=221277.html'),
        oldFarmerBelief: path.resolve(process.cwd(), 'meworksv2a/meworks/page1.aspx﹖no=221278.html'),
      },
    },
  },
  server: {
    port: 5173,
  },
})
