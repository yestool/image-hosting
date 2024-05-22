import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import imageController from './controllers/imageController'
import { serveStatic } from '@hono/node-server/serve-static'
const app = new Hono()



app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/img', imageController)

const port = 3000
console.log(`Server is running on port ${port}，visit http://localhost:${port}/`)

serve({
  fetch: app.fetch,
  port
})
