// SSR prerender via Chromium headless (Playwright).
// Lance vite preview, charge chaque route dans un vrai navigateur, attend
// l'hydratation React, capture le HTML final et le sauvegarde dans dist/.
//
// Impact LCP mobile : l'image hero apparaît dans le HTML servi — Lighthouse
// la détecte immédiatement sans attendre le JS (gain ~2-3 s sur LCP mobile).

import { chromium } from 'playwright'
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')

// ── Routes à pré-rendre (mêmes que prerender.mjs) ────────────────────────────
const ROUTES = [
  { path: '/', file: 'index.html' },
  { path: '/services', file: 'services/index.html' },
  { path: '/flotte', file: 'flotte/index.html' },
  { path: '/a-propos', file: 'a-propos/index.html' },
  { path: '/contact', file: 'contact/index.html' },
  { path: '/mentions-legales', file: 'mentions-legales/index.html' },
  { path: '/taxi-aeroport-marseille-aix-en-provence', file: 'taxi-aeroport-marseille-aix-en-provence/index.html' },
  { path: '/taxi-gare-tgv-aix-en-provence', file: 'taxi-gare-tgv-aix-en-provence/index.html' },
  { path: '/vtc-luberon-gordes-cassis', file: 'vtc-luberon-gordes-cassis/index.html' },
  { path: '/chauffeur-prive-mariage-aix', file: 'chauffeur-prive-mariage-aix/index.html' },
]

const PORT = 4329

// ── Lance vite preview en background ─────────────────────────────────────────
async function startPreview() {
  console.log(`[ssr] démarrage vite preview sur :${PORT}...`)
  const proc = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  // Attendre le ready signal
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('preview timeout')), 15000)
    proc.stdout.on('data', chunk => {
      const text = chunk.toString()
      if (text.includes('Local:') || text.includes(`localhost:${PORT}`)) {
        clearTimeout(timeout)
        setTimeout(resolve, 500) // petit délai pour stabiliser
      }
    })
    proc.stderr.on('data', chunk => {
      const text = chunk.toString()
      if (text.toLowerCase().includes('error')) {
        console.error('[ssr] preview stderr:', text)
      }
    })
  })

  console.log('[ssr] preview prêt')
  return proc
}

// ── Rend chaque route dans Chromium et capture le HTML final ────────────────
async function renderRoute(browser, route) {
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone 13 — mobile-first pour SSR
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15',
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  const url = `http://localhost:${PORT}${route.path}`
  await page.goto(url, { waitUntil: 'networkidle', timeout: 20000 })

  // Attendre que React ait hydraté et que le contenu soit stable
  await page.waitForFunction(() => {
    const root = document.getElementById('root')
    return root && root.children.length > 0
  }, { timeout: 10000 })
  await page.waitForTimeout(800) // laisser les animations initiales se poser

  // Capturer le HTML final (DOCTYPE inclus)
  const html = await page.evaluate(() => {
    // Nettoyer les éléments injectés par les dev tools / helmet duplicatas
    document.querySelectorAll('[data-vite-dev-id]').forEach(el => el.remove())
    return '<!doctype html>\n' + document.documentElement.outerHTML
  })

  await context.close()
  return html
}

// ── Exécution ────────────────────────────────────────────────────────────────
if (!existsSync(DIST)) {
  console.error('[ssr] dist/ inexistant — lancer vite build d\'abord')
  process.exit(1)
}

const preview = await startPreview()

try {
  const browser = await chromium.launch({ headless: true })
  console.log('[ssr] chromium lancé')

  for (const route of ROUTES) {
    const start = Date.now()
    try {
      const html = await renderRoute(browser, route)
      const outPath = join(DIST, route.file)
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, html, 'utf8')
      const size = (html.length / 1024).toFixed(1)
      const duration = Date.now() - start
      console.log(`[ssr] ✓ ${route.file.padEnd(55)} ${size} KB  (${duration}ms)`)
    } catch (err) {
      console.error(`[ssr] ✗ ${route.path}: ${err.message}`)
    }
  }

  await browser.close()
  console.log(`[ssr] ${ROUTES.length} pages rendues en SSR`)
} finally {
  preview.kill()
}
