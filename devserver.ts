import { showRoutes } from 'hono/dev'
import { createApp } from 'honox/server'
import { createApi } from './api/apiserver'

const api = createApi()

const app = createApp({app: api as any})

showRoutes(app)

export default app
