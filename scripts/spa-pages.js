// Runs after "npm run build" (see "postbuild" in package.json).
// GitHub Pages only knows files, so a direct visit to ovalfarm.in/privacy-policy would get the
// 404 page first (with a "not found" status) before the app opens it. Google checks these pages
// for the sign-in screen, so give each one a real copy of index.html.
const fs = require('fs')
const path = require('path')

const PAGES = ['privacy-policy', 'terms-of-service']
const build = path.join(__dirname, '..', 'build')
const html = fs.readFileSync(path.join(build, 'index.html'))

for (const page of PAGES) {
  fs.mkdirSync(path.join(build, page), { recursive: true })
  fs.writeFileSync(path.join(build, page, 'index.html'), html)
}
console.log('Added pages:', PAGES.join(', '))
