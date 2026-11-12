import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourceRoot = path.join(root, 'meworksv2a')
const outputDir = path.join(root, 'public')
const outputFile = path.join(outputDir, 'content-index.json')
const siteUrl = (process.env.SITE_URL || 'https://www.meworks.net').replace(/\/$/, '')

const decodeEntities = (value) => value
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;/gi, '"')
  .replace(/&#39;|&apos;/gi, "'")
  .replace(/&lt;/gi, '<')
  .replace(/&gt;/gi, '>')
  .replace(/&ldquo;|&rdquo;/gi, '”')
  .replace(/&lsquo;|&rsquo;/gi, '’')
  .replace(/&hellip;/gi, '…')
  .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
  .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))

const cleanText = (value = '') => decodeEntities(value)
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const findFiles = (directory) => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const entryPath = path.join(directory, entry.name)
  return entry.isDirectory() ? findFiles(entryPath) : [entryPath]
})

const articles = findFiles(sourceRoot)
  .filter((filePath) => filePath.endsWith('.html') && filePath.includes('newsno='))
  .map((filePath) => {
    const html = fs.readFileSync(filePath, 'utf8')
    const title = cleanText(html.match(/<span[^>]+mw_news_step1_title[^>]*>([\s\S]*?)<\/span>/i)?.[1]
      || html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.split('@')[0])
    const date = html.match(/mw_news_step1_date[^>]*>(\d{4}-\d{2}-\d{2})</i)?.[1] || ''
    const section = cleanText(html.match(/mw_news_step1_nav_title[\s\S]*?<a[^>]*>([\s\S]*?)<\/a>/i)?.[1]
      || html.match(/<title>[\s\S]*?@\s*([^:<]+?)(?:::|<\/title>)/i)?.[1])
    const contentBlock = html.match(/mw_news_step1_content[^>]*>([\s\S]*?)<\/span>\s*<\/span>/i)?.[1] || ''
    const content = cleanText(contentBlock)
    const description = cleanText(html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)/i)?.[1])
    const relativePath = path.relative(root, filePath).split(path.sep).join('/')

    return {
      title,
      section,
      date,
      description: description || content.slice(0, 180),
      content,
      href: `/${encodeURI(relativePath).replace(/%EF%B9%96/g, '%EF%B9%96')}`,
    }
  })
  .filter((article) => article.title && article.content)
  .sort((left, right) => right.date.localeCompare(left.date) || left.title.localeCompare(right.title, 'zh-Hant'))

fs.mkdirSync(outputDir, { recursive: true })
fs.writeFileSync(outputFile, JSON.stringify({ generatedAt: new Date().toISOString(), articles }))
fs.writeFileSync(path.join(outputDir, 'recent-content.json'), JSON.stringify({ articles: articles.slice(0, 6).map(({ content, ...article }) => article) }))
const sitemapRoutes = ['', '/categories', '/featured', '/archive']
const sitemapUrls = [...sitemapRoutes.map((route) => `${siteUrl}${route}`), ...articles.map((article) => `${siteUrl}${article.href}`)]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map((url) => `  <url><loc>${url.replace(/&/g, '&amp;')}</loc></url>`).join('\n')}\n</urlset>\n`
fs.writeFileSync(path.join(outputDir, 'sitemap.xml'), sitemap)
console.log(`Generated ${articles.length} searchable articles at ${path.relative(root, outputFile)}`)
