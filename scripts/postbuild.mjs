// Copia index.html a 404.html: GitHub Pages sirve 404.html cuando se pide una
// ruta que no existe, de modo que la app (que enruta en el cliente) sigue
// funcionando al recargar o al abrir un enlace directo.
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
if (existsSync(resolve(dist, 'index.html'))) {
    copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    console.log('postbuild: dist/404.html creado')
} else {
    console.warn('postbuild: no se encontro dist/index.html')
}
