import pages from '@hono/vite-cloudflare-pages'
import adapter from '@hono/vite-dev-server/cloudflare'
import honox from 'honox/vite'
import { defineConfig } from 'vite'
import ssg from '@hono/vite-ssg'
import devServer from '@hono/vite-dev-server'
import client from 'honox/vite/client'

export default ({ mode }:any) => {
  //console.log('mode:', mode)
  if(mode === 'development') {
    const server = {
      adapter: adapter,
      entry: 'devserver.ts',
    }
    return defineConfig({
      plugins: [honox({ devServer: server }), pages()]
    })
  } else if(mode === 'server') {
    return defineConfig({
      plugins: [
        devServer({
          adapter,
          entry: 'api/server.ts',
        }),
      ],
      build: {
        target: 'esnext',
        outDir: './dist_server',
        copyPublicDir: false,
        rollupOptions: {
          input: 'api/server.ts',
          output: {
            entryFileNames: 'api.js',
            footer: 'export default app'
          },
        },
      }
    })
  } else {
    const entry = './app/server.ts'
    const outputDir = './dist'
    if (mode === 'client') {
      return {
        plugins: [client()],
        build: {
          outDir: outputDir
        }
      }
    } else {
      return {
        plugins: [honox(), ssg({ entry })],
        build: {
          emptyOutDir: false,
          outDir: outputDir
        },
      }
    }
    /*
    return defineConfig({
      plugins: [honox(), pages({ outputDir }), ssg({ entry })],
      build: {
        target: 'esnext',
        outDir: outputDir,
      },
    })
    */
  }
}