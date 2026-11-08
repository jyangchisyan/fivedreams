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

function githubPagesAssets() {
  const base = process.env.SITE_BASE || '/'
  const rebase = (text) => base === '/' ? text : text.replace(/(["'=(])\/(meworksv2a\/|userfile\/|U\/|#\/)/g, `$1${base}$2`)
  return {
    name: 'github-pages-assets',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('/src/') && /\.(vue|js)$/.test(id)) return base === '/' ? code : code.replace(/(["'=(])\/(meworksv2a\/|U\/|#\/)/g, `$1${base}$2`)
    },
    closeBundle() {
      const copy = (source, dest) => {
        for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
          if (entry.name === '.DS_Store') continue
          const from = path.join(source, entry.name)
          const to = path.join(dest, entry.name)
          if (entry.isDirectory()) {
            fs.mkdirSync(to, { recursive: true })
            copy(from, to)
          } else if (!fs.existsSync(to)) {
            if (/\.(html|css|js)$/i.test(entry.name)) fs.writeFileSync(to, rebase(fs.readFileSync(from, 'utf8')))
            else fs.copyFileSync(from, to)
          }
        }
      }
      for (const dir of ['meworksv2a', 'userfile', 'U']) {
        fs.mkdirSync(path.join('dist', dir), { recursive: true })
        copy(dir, path.join('dist', dir))
      }
    },
  }
}

export default defineConfig({
  base: process.env.SITE_BASE || '/',
  plugins: [githubPagesAssets(), legacyHtmlPassthrough(), vue()],
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
